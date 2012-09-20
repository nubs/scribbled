/* Let's take a moment to go over requirejs syntax for defining a module.  The
 * define statement acts very similarly to the require statement, but its
 * return value is used whenever somebody requires this file (in this case,
 * 'router') to pass it back to the calling code. */
define(['backbone'], function(Backbone) {
  /* A backbone router is responsible for responding to changes in the url for
   * the application.  Any url goes through the routes configuration to find a
   * match (wildcards and parameters can be used) and call the appropriate
   * method for that route.  Any parameters captured in the match will get
   * passed to the method. */
  var Router = Backbone.Router.extend({
    routes: {
      /* The empty route is the default route when no path is specified. In
       * this case lets set it up to map to the index method. */
      '': 'index'
    },

    /* We don't want the router to be responsible for loading the base
     * application element from the DOM, so make sure to pull it in via the
     * constructor. */
    initialize: function(options) {
      this.appEl = options.appEl;
    },

    index: function() {
    }
  });

  return Router;
});
