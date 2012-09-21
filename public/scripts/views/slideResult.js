/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string slideTemplate. */
define(['backbone', 'handlebars', 'text!templates/slideResult.hbs', 'underscore'], function(Backbone, Handlebars, slideResultTemplate, _) {
  /* This view is meant to render a single slide to a list element.  We'd
   * probably have a few different slideTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var SlideResultView = Backbone.View.extend({
    tagName: 'li',
    className: 'slideResultContainer',

    /* We loaded the template into the slideTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(slideResultTemplate),

    initialize: function(){
      _.bindAll(this, 'render', 'preserveAspectRatio', 'showImage');
      this.$el.css('display', 'none');
    },

    render: function() {
      /* Rendering the element is as simple as converting the Backbone model
       * into an object that just has the data fields (toJSON does this) and
       * passing that into the template.  Use jquery to set the html of the
       * element to the results of the template and we're good to go. */
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.css({
        'background-image': "url('" + this.model.get('imageUrl') + "')",
        'background-repeat': 'no-repeat'
      });
      this.$el.find('img').on('load', this.showImage);
      return this;
    },

    showImage: function() {
      this.preserveAspectRatio();
      this.$el.css('display', 'inline-block');
      this.$el.addClass('fade-in');
    },

    preserveAspectRatio: function() {
      var img = new Image();
      img.src = this.model.get('imageUrl');
      var maxHeight = 120;
      this.$el.css('background-size', 'auto ' + maxHeight + 'px');
      this.$el.width(maxHeight * img.width / img.height);
      this.$el.height(maxHeight);
    }
  });

  return SlideResultView;
});
