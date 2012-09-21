/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string slideTemplate. */
define(['backbone', 'handlebars', 'text!templates/slide.hbs', 'underscore', 'views/note', 'models/note', 'jqueryui', 'drag'], function(Backbone, Handlebars, slideTemplate, _, NoteView, NoteModel) {
  /* This view is meant to render a single slide to a list element.  We'd
   * probably have a few different slideTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var SlideView = Backbone.View.extend({

    zoomed: false,
    imageWidth: 0,
    imageHeight: 0,
    zoomToX: 0,
    zoomToY: 0,
    isEdit: false,

    tagName: 'div',
	className: 'slideContainer',

    /* We loaded the template into the slideTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(slideTemplate),

    events: {
      click: 'zoomIn'
    },

    displayNotes: true,

    zoomIn: function(e) {
      if (!this.zoomed) {
        this.zoomed = true;
        var target = $(e.target);
        var offset = target.offset();
        this.zoomToX = (e.clientX - offset.left) * (this.imageWidth / target.width());
        this.zoomToY = (e.clientY - offset.top) * (this.imageHeight / target.height());
        this.render();
		this.$('img').css('cursor','-moz-grab');
      }
    },

    initialize: function(){
      _.bindAll(this, 'render', 'sizeToFit', 'zoomIn', 'hideNotes', 'showNotes', 'triggerModel');
      this.model.on('change', this.render);
      this.model.on('change', this.triggerModel);
      this.options.app.on('hideNotes', this.hideNotes);
      this.options.app.on('showNotes', this.showNotes);
    },

    triggerModel: function(){
      this.options.app.trigger('modelChanged', this.model);
    },

    hideNotes: function() {
      this.displayNotes = false;
      this.renderNotes();
    },

    showNotes: function() {
      this.displayNotes = true;
      this.renderNotes();
    },

    render: function() {
      /* Rendering the element is as simple as converting the Backbone model
       * into an object that just has the data fields (toJSON does this) and
       * passing that into the template.  Use jquery to set the html of the
       * element to the results of the template and we're good to go. */
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.dragscrollable();
      this.$el.find('img').on('load', this.sizeToFit);
      $(window).resize(this.sizeToFit);
      this.notes = this.model.get('notes');
      this.renderNotes();
      return this;
    },

    renderNotes: function(){
      this.$el.find('.noteContainer').remove();
      if (!this.displayNotes) {
        return;
      }
      _.each(this.notes, _.bind(function(note) {
        note.slideId = this.model.get('_id');
        var view = new NoteView({model: new NoteModel(note), imageHeight: this.imageHeight, imageWidth: this.imageWidth, isEdit: this.isEdit});
        this.$el.append(view.render().el);
      }, this));
    },

    sizeToFit: function() {
      var img = new Image();
      img.src = this.model.get('imageUrl');
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      var $window = $(window);
      var maxWidth = $window.width()-70;
      var maxHeight = $window.height()-195;
      var divHeight, divWidth;
      if (maxWidth/maxHeight > this.imageWidth/this.imageHeight) {
        divHeight = maxHeight;
        if (!this.zoomed) {
          this.$el.find('img').css({
            'width': 'auto',
            'height': maxHeight 
          });
          divWidth = divHeight * this.imageWidth/this.imageHeight;
        } else {
          this.$el.find('img').css({
            'width': 'auto',
            'height': 'auto' 
          });
          divWidth = maxWidth;
        }
      } else {
        divWidth = maxWidth;
        if (!this.zoomed) {
          this.$el.find('img').css({
            'width': maxWidth,
            'height': 'auto' 
          });
          divHeight = divWidth * this.imageHeight/this.imageWidth;
        } else {
          this.$el.find('img').css({
            'width': 'auto',
            'height': 'auto' 
          });
          dixHeight = maxHeight;
        }
      }
      this.$el.width(divWidth);
      this.$el.height(divHeight);
      if (this.zoomed) {
        this.$el.find('img').css({
          'width': this.imageWidth,
          'height': this.imageHeight 
        });
        this.$el.css('overflow', 'scroll');
        if (this.zoomToX != 0 && this.zoomToY != 0) {
          this.$el.scrollLeft(Math.min(this.imageWidth - this.$el.width(), this.zoomToX - this.$el.width()/2));
          this.$el.scrollTop(Math.min(this.imageHeight - this.$el.height(), this.zoomToY - this.$el.height()/2));
          this.zoomToX = 0;
          this.zoomToY = 0;
        }
      } else {
        this.$el.find('img').css({
          'width': divWidth,
          'height': divHeight 
        });
      }
      this.renderNotes();
    }
  });

  return SlideView;
});
