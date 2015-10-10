(function() {
  'use strict';
  InstantClick.on('change', function() {
    initSmoothScroll();
    window.analytics.page();
  });
  InstantClick.init();

  function initSmoothScroll() {
    //smooth scrolling on clicks
    jQuery('a[href*=#]').on('click', function(e) {
      if (this.href.indexOf('#') === 0) {
        e.preventDefault();
      }
      //don't scroll on accordion toggle
      if (this.parentNode.className.split('accordion-navigation').length < 2) {
        jQuery('body').animate({
          scrollTop: parseInt(jQuery('' + this.href.substring(
            this.href.indexOf('#'))).offset().top
          )
        }, 500);
      }
    });

    //smooth scrolling on pageloads
    jQuery(function() {
      if (window.location.hash) {
        jQuery('body').animate({
          scrollTop: parseInt(jQuery('' + window.location.href.substring(
            window.location.href.indexOf('#'))).offset().top
          )
        }, 500);
      }
    });
  }

}());
