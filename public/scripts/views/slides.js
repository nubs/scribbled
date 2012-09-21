define(['underscore', 'backbone', 'views/slide'], function(_, Backbone, SlideView) {
  /* A Backbone View is responsible for a single element on the page and its
   * children.  Oftentimes its element is created automatically by the view,
   * although the calling method can pass it in as well.  Views can be hooked
   * up to collections/models automatically to make interacting with them
   * easier.  They also generally bind to events on the collection/model to
   * update the view when the data changes. */
  var SlidesView = Backbone.View.extend({
    /* These two parameters essentially default this view's element to <ul class="slides"></ul> */
    tagName: 'ul',
    className: 'slides',

    initialize: function() {
      /* Underscore provides some easy methods to ensure that functions are
       * called with the correct context.  For example, when event handlers are
       * invoked, many of them set the context (this) to point to the affected
       * DOM element.  Using _.bindAll like this ensures that when we're inside
       * render and addSlide, this is always a reference to this view. */
      _.bindAll(this, 'addSlide', 'render');
      
      /* Backbone relies a lot on asynchronous events to pass messages around
       * and update things.  Here, we are registering an event handler for
       * whenever the slides collection is reset, or, in other words, fetched
       * originally or fetched again (perhaps with new parameters to fetch.  So
       * whenever the collection is loaded with data from the API, this view
       * will be rendered. */
      this.collection.on('reset', this.render);
    },

    /* Render is responsible for rendering the view to the element. */
    render: function() {
      this.$el.empty();

      /* To render it, we'll loop over the collection and call a helper to add
       * each slide to the view. */
      this.collection.each(this.addSlide);

      /* It is conventional to return the view from the render method as you
       * often want to grab the element of the rendered view like below. */
      return this;
    },

    /* This helper is here because it can be useful to add single slides to the
     * view, for example when a new slide is created. */
    addSlide: function(slide) {
      /* While we could render each slide inside this view, in many cases it
       * makes for less duplication to split out a collection into individual
       * views for each element in the collection.  All we have to do is pass
       * the slide into the child view, tell the view to render, and then append
       * its element to our list element. */
      var view = new SlideView({model: slide});
      this.$el.append(view.render().el);
    }
  });

  return SlidesView;
});
