(function() {
  'use strict';
  InstantClick.on('change', function() {
    pageInitialize(window);
  });
  InstantClick.init();

  function pageInitialize(window) {
    initSmoothScroll();
    window.Prism.highlightAll();
    window.analytics.page();
  }

  function initSmoothScroll() {
    // //smooth scrolling on clicks
    // jQuery('a[href*=#]').on('click', function(e) {
    //   if (this.href.indexOf('#') === 0) {
    //     e.preventDefault();
    //   }
    //   jQuery('body').animate({
    //     scrollTop: parseInt(jQuery('' + this.href.substring(
    //       this.href.indexOf('#'))).offset().top
    //     )
    //   }, 500);
    // });
    //
    // //smooth scrolling on pageloads
    // jQuery(function() {
    //   if (window.location.hash) {
    //     jQuery('body').animate({
    //       scrollTop: parseInt(jQuery('' + window.location.href.substring(
    //         window.location.href.indexOf('#'))).offset().top
    //       )
    //     }, 500);
    //   }
    // });
  }

}());
