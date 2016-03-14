$(document).ready(function() {
  'use strict';

  var margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 75
  };

  var width = 960 - margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  var x = d3.scale.linear().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);
  var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(10).tickSize(-height, 0, 0);
  var yAxis = d3.svg.axis().scale(y).orient('left').ticks(10).tickSize(-width, 0, 0);

  var maxLine = d3.svg.line()
    .x(function(d) { return x(d.height); })
    .y(function(d) { return y(d.bytes); })
    .interpolate('step-before');

  var color = d3.scale.linear();

  var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  function type(d) {
    d.height = parseInt(d.height);
    d.bytes = parseInt(d.bytes);
    return d;
  }

  function exponentialMovingAverage(blockSize, numberOfBlocks, lastBlockSizeAverage) {
    var k = 2 / (numberOfBlocks + 1);
    return blockSize * k + lastBlockSizeAverage * (1 - k);
  }

  function average(range) {
    var total = range.length;
    var sum = range.reduce(function(a, b) {
      return a + b;
    }, 0);
    return Math.round(sum / total);
  }

  function weightedAverage(range) {
    var triangle = range.reduce(function(a, b, n) {
      return a + n;
    }, 0);
    var result = 0;
    for (var i = 0; i < range.length; i++) {
      result = result + (range[i] * (i + 1) / triangle);
    }
    return Math.round(result);
  }

  function median(range) {
    range.sort(function(a, b) {
      return a - b;
    });
    var even = (range.length % 2 === 0);
    var m;
    if (even) {
      var mid = range.length / 2;
      var sum = range[mid] + range[mid + 1];
      m = Math.round(sum / 2);
    } else {
      var mid = Math.floor(range.length / 2);
      m = range[mid];
    }
    return m;
  }

  d3.csv('blocksizes.csv', type, function(error, csvData) {
    if (error) {
      throw error;
    }

    // To slice a portion of the history
    // csvData = csvData.slice(300000, 390000);

    // The number of previous blocks to sample
    var lookback = 144 * 365;

    // The factor that the median is multiplied
    var factor = 2;

    // The fixed minimum size
    var floor = 100000;

    //Exponential Moving Average
    var maxBlockSizes = [{
      height: 0,
      bytes: 0
    }];
    var lastEma = 0;
    for (var i = 0; i < csvData.length; i++) {
      var ema = exponentialMovingAverage(csvData[i].bytes, lookback, lastEma);
      var newMax = Math.round((ema * factor) + floor);
      maxBlockSizes.push({
        height: csvData[i].height,
        bytes: newMax
      });
      lastEma = ema;
    }

    // // Average and Median
    // var maxBlockSizes = [{
    //   height: 0,
    //   bytes: 0
    // }];
    // for (var i = 0; i < csvData.length; i++) {
    //   if (i % (144 * 1) === 0) {
    //     var range = [];
    //     for (var j = 0; j < lookback; j++) {
    //       var prev = i - j;
    //       if (prev > 0) {
    //         range.push(csvData[prev].bytes);
    //       } else {
    //         range.push(0);
    //       }
    //     }
    //     var newMax = Math.round((median(range) * factor) + floor);
    //     maxBlockSizes.push({
    //       height: csvData[i].height,
    //       bytes: newMax
    //     });
    //   }
    // }

    var data = [];
    for (var i = 0; i < csvData.length; i++) {
      if (i % 10) {
        data[data.length - 1].bytes = (data[data.length - 1].bytes + csvData[i].bytes) / 2;
      } else {
        data.push(csvData[i]);
      }
    }

    // Sets the max bounds of the chart
    x.domain(d3.extent(maxBlockSizes, function(d) { return d.height; }));
    y.domain(d3.extent(maxBlockSizes, function(d) { return d.bytes; })).nice();

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Bytes');

    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 0.5)
      .attr('cx', function(d) { return x(d.height); })
      .attr('cy', function(d) { return y(d.bytes); })
      .style('fill', function(d) { return color(d.bytes); });

    svg.append('path')
      .datum(maxBlockSizes)
      .attr('class', 'maxLine')
      .attr('d', maxLine);
  });

});
