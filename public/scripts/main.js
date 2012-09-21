/* First, we need to configure requirejs and tell it where to find some of the
 * libraries that are not part of our application and that don't use the AMD
 * specification for defining their functionality. */
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    jqueryui: {
      deps: ['jquery']
    },
    drag: {
      deps: ['jquery']
    },
    handlebars: {
      exports: 'Handlebars'
    }
  },
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min',
    jqueryui: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.23/jquery-ui.min',
    underscore: 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min',
    backbone: 'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
    text: '../vendor/requirejs-text/text',
    drag: '/scripts/dragscrollable',
    handlebars: 'http://cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.0.beta6/handlebars.min'
  }
});

/* Now we setup our main application.  Because we are using Backbone.js, this
 * comes down to just some global Backbone configuration, and starting up the
 * router. */
require(['jquery', 'backbone', './router'], function($, Backbone, Router) {
  /* A common theme to this example, is that when it can be done simply, a
   * module shouldn't reach outside of itself to grab what it needs.  A great
   * example of that is the DOM.  The idea being that a Backbone view should
   * render to it's own element, and that the calling code should be
   * responsible for attaching that element to the page itself.  This can help
   * make the views themselves testable as well as keep a strict separation of
   * concerns.  You'll notice that this call to $('#app') is the only place in
   * this code where an element from the DOM is fetched directly.  All of the
   * rest of the code will use whatever is passed in and attach itself to that.
   * */
  var router = new Router({appEl: $('#app'), footerEl: $('#appFooter')});

  /* This sets up the ability for the forward/back buttons in the browser to
   * work.  In particular the pushState parameter will make newer browsers
   * build the url in the path rather than the fragment. (i.e.
   * http://example.com/pails/52 rather than http://example.com/#pails/52) */
  Backbone.history.start({pushState: true});
});
