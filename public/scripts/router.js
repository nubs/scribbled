/* Let's take a moment to go over requirejs syntax for defining a module.  The
 * define statement acts very similarly to the require statement, but its
 * return value is used whenever somebody requires this file (in this case,
 * 'router') to pass it back to the calling code. */
define(['backbone', 'models/slide', 'collections/slides', 'views/footer', 'views/slide', 'views/slides', 'views/start'], function(Backbone, Slide, Slides, FooterView, SlideView, SlidesView, StartView) {
  /* A backbone router is responsible for responding to changes in the url for
   * the application.  Any url goes through the routes configuration to find a
   * match (wildcards and parameters can be used) and call the appropriate
   * method for that route.  Any parameters captured in the match will get
   * passed to the method. */
  var Router = Backbone.Router.extend({
    routes: {
      /* The empty route is the default route when no path is specified. In
       * this case lets set it up to map to the index method. */
      '': 'index',
      'start': 'start',
      'slides/:id': 'slide',
      'search/:tags': 'search'
    },

    /* We don't want the router to be responsible for loading the base
     * application element from the DOM, so make sure to pull it in via the
     * constructor. */
    initialize: function(options) {
      this.appEl = options.appEl;
      this.footerView = new FooterView({app: this});
      options.footerEl.html(this.footerView.el);
      this.footerView.render();
    },

    index: function() {
      this.slide('505b35d48160ce21de864146');
    },

    slide: function(id) {
      /* Here, we create a new collection that we will be fetching from our api. */
      var slide = new Slide({_id: id});

      /* The pailsView renders a collection of pails, so we use the Backbone.js
       * collection parameter to define the collection that the pails view
       * uses. */
      var slideView = new SlideView({model: slide});

      /* Even though we haven't caused the pailsView to render yet, it already
       * has an element assigned to it (all views do), so lets go ahead and
       * attach its element to the DOM. */
      this.appEl.html(slideView.el);

      /* Now that we have the pails collection hooked into a view, and that
       * view is hooked into the application, we can go ahead and fetch the
       * pails from the API.  Because the pails view is setup to render
       * whenever its collection gets reset, the render will be triggered when
       * the fetch is completed and everything proceeds beautifully. */
      slide.fetch();
    },

    start: function(){
      /* page that contain static starting points and ui for create a slide or searching for a slide*/
      this.startView = new StartView();
      this.appEl.html(this.startView.el);
      this.startView.render();
    },

    search: function(tags) {
      var slides = new Slides();

      var slidesView = new SlidesView({collection: slides});
      this.appEl.html(slidesView.el);

      slides.fetch({data: {tags: tags.split(',')}});
    }
  });

  return Router;
});
