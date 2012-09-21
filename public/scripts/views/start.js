/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string startTemplate. */
define(['backbone', 'handlebars', 'text!templates/start.hbs', 'underscore', 'models/slide'], function(Backbone, Handlebars, startTemplate, _, Slide) {
  /* This view is meant to render a single start to a list element.  We'd
   * probably have a few different startTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var StartView = Backbone.View.extend({
    tagName: 'div',
    className: 'startForm',
    events: {
      'submit #addImageUrl': 'addImageUrl'
    },

    /* We loaded the template into the startTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(startTemplate),

    initialize: function(){
      _.bindAll(this, 'render', 'addImageUrl');
    },

    render: function() {
      /* Rendering the element is as simple as converting the Backbone model
       * into an object that just has the data fields (toJSON does this) and
       * passing that into the template.  Use jquery to set the html of the
       * element to the results of the template and we're good to go. */
      this.$el.html(this.template());
      return this;
    },

    addImageUrl: function(e) {
      e.preventDefault();

      var slide = new Slide({title: this.$('#imageTitle').val(), imageUrl: this.$('#imageUrl').val()});

      slide.save().done(_.bind(function(data) {
        this.options.app.navigate('slides/' + data._id, {trigger: true});
      }, this));
    }
  });

  return StartView;
});
