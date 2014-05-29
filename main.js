requirejs.config({
  baseUrl: './',
  paths: {

    // Dynamically loads the proper version of jQuery from the google cdn with local fallbacks.
    // <IE9 will get jQuery 1.10.2 and modern browsers get 2.0
    jquery: (document.addEventListener) ?
            ['//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min','vendor/js/jquery/jquery.min']
            :
            ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min','vendor/js/jquery-legacy/jquery.min'],
  }
});

require(['jquery.scrollfreeze'], function() {

    $(function () {
      console.log('document.ready');
    });

});