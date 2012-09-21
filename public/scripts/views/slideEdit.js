/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string slideTemplate. */
define(['backbone', 'handlebars', 'views/slide', 'text!templates/editDialog.hbs', 'underscore', 'jqueryui', 'drag'], function(Backbone, Handlebars, SlideView, editDialogTemplate, _) {
  /* This view is meant to render a single slide to a list element.  We'd
   * probably have a few different slideTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var SlideEditView = SlideView.extend({

    editTemplate: Handlebars.compile(editDialogTemplate),

    events: {
      dblclick: 'createNote',
      click: 'zoomIn'
    },

    render: function(){
      //TODO Inform user about double clicking to create note.
      return _.bind(SlideView.prototype.render, this)();
    },

    createNote: function(e){
      templateVars = {
        x:e.clientX,
        y:e.clientY,
        icons: [
          "tag",
          "beaker",
          "flag",
          "tags",
          "camera",
          "map-marker"
        ]
      };
      this.editDiv = $(this.editTemplate(templateVars));
      this.editDiv.dialog({"title": "Create New Note"});
      this.editDiv.find('#createNoteButton').click(_.bind(this.saveNewButton, this));
      e.stopPropagation();
    },

    saveNewButton: function(){
      var newNote = {
        description: $('#description', this.editDiv).val(),
        icon: $(":radio:checked[name='icon']", this.editDiv).attr('id'),
        position: {
          x:$("#xPos", this.editDiv).val(),
          y:$("#yPos", this.editDiv).val()
        },
        url: [$('#link', this.editDiv).val()]
      };
      var notes = this.model.get('notes');
      notes.push(newNote);
      this.model.set('notes', notes);
      this.model.save();
      this.editDiv.dialog('close');
    }

  });

  return SlideEditView;
});
