/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string slideTemplate. */
define(['backbone', 'handlebars', 'text!templates/slide.hbs', 'underscore'], function(Backbone, Handlebars, slideTemplate, _) {
  /* This view is meant to render a single slide to a list element.  We'd
   * probably have a few different slideTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var SlideView = Backbone.View.extend({
    tagName: 'div',
	className: 'slideContainer',

    /* We loaded the template into the slideTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(slideTemplate),

    initialize: function(){
      _.bindAll(this, 'render', 'sizeToFit');
      this.model.on('change', this.render);
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
      this.$el.find('img').on('load', this.sizeToFit);
      $(window).resize(this.sizeToFit);
      return this;
    },

    sizeToFit: function() {
      var img = new Image();
      img.src = this.model.get('imageUrl');
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      var $window = $(window);
      var maxWidth = $window.width();
      var maxHeight = $window.height()-195;
      var divHeight, divWidth;
      if (maxWidth/maxHeight > this.imageWidth/this.imageHeight) {
        this.$el.css('background-size', 'auto ' + maxHeight + 'px');
        divHeight = maxHeight;
        divWidth = divHeight * this.imageWidth/this.imageHeight;
      } else {
        this.$el.css('background-size', maxWidth + 'px auto');
        divWidth = maxWidth;
        divHeight = divWidth * this.imageHeight/this.imageWidth;
      }
      this.$el.width(divWidth);
      this.$el.height(divHeight);
    }
  });

  return SlideView;
});
