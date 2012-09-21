/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string slideTemplate. */
define(['backbone', 'handlebars', 'text!templates/editDialog.hbs', 'text!templates/note.hbs', 'underscore'], function(Backbone, Handlebars, editDialogTemplate, noteTemplate, _) {
  /* This view is meant to render a single slide to a list element.  We'd
   * probably have a few different slideTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var NoteView = Backbone.View.extend({
    tagName: 'div',
    className: 'noteContainer',

    /* We loaded the template into the slideTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(noteTemplate),
    editTemplate: Handlebars.compile(editDialogTemplate),

    events: {
      click: 'showNote',
      'click .note .icon-edit': 'editNote',
      'click .note .icon-trash': 'removeNote'
    },

    removeNote: function(e){
      this.model.destroy();
      this.remove();
      e.stopPropagation();
    },

    editNote: function(e){
      var templateVars = this.model.toJSON();
      templateVars.icons = [
          {class:"tag"},
          {class:"beaker"},
          {class:"flag"},
          {class:"tags"},
          {class:"camera"},
          {class:"map-marker"}
      ];
      _.each(templateVars.icons, function(value, index){
        if (templateVars.icon == value.class) {
          value.selected = true;
        }
      });
      this.editDiv = $(this.editTemplate(templateVars));
      this.editDiv.dialog({"title": "Edit Note"});
      this.editDiv.find('#saveNoteButton').click(_.bind(this.editNoteButton, this));
      e.stopPropagation();
    },

    editNoteButton: function(){
      this.model.set('description', $('#description', this.editDiv).val());
      this.model.set('icon', $(":radio:checked[name='icon']", this.editDiv).attr('id'));
      this.model.set('position', {
        x:$("#xPos", this.editDiv).val(),
        y:$("#yPos", this.editDiv).val()
      });
      this.model.set('sources', [{url:$('#link', this.editDiv).val()}]);
      this.model.save();
      this.editDiv.dialog('close');
    },

    showNote: function(e){
      this.$el.find('.note').toggle();
      e.stopPropagation();
    },

    initialize: function(){
      _.bindAll(this, 'render', 'editNote');
      this.model.on('change', this.render);
    },

    render: function() {
      /* Rendering the element is as simple as converting the Backbone model
       * into an object that just has the data fields (toJSON does this) and
       * passing that into the template.  Use jquery to set the html of the
       * element to the results of the template and we're good to go. */
      var templeVars = this.model.toJSON();
      templeVars.isEdit = this.options.isEdit;
      this.$el.html(this.template(templeVars));
      if (this.options.imageWidth != 0) {
        var ratio =  $('.slideContainer img:first').width() / this.options.imageWidth;
        this.$el.css({
          'left': this.model.get('position').x * ratio,
          'top': this.model.get('position').y * ratio,
          'position': 'absolute' 
        });
      }
      return this;
    }
  });

  return NoteView;
});
