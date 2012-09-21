/* You'll notice here that the template dependency is a little different. The
 * requirejs-text plugin allows requirejs to load dependent strings from files.
 * Here we load the handlebars template into the string startTemplate. */
define(['backbone', 'handlebars', 'text!templates/footer.hbs', 'underscore'], function(Backbone, Handlebars, footerTemplate, _) {
  /* This view is meant to render a single start to a list element.  We'd
   * probably have a few different startTemplates, 1 for the list of them and
   * another for the 'details' page, for instance. */
  var FooterView = Backbone.View.extend({
    tagName: 'form',
    className: 'footerSearch form-inline',
    events: {
      submit: 'doSearch',
      'click #toggleNotes': 'toggleNotes',
      'click #edit': 'toggleEdit'
    },


    /* We loaded the template into the startTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(footerTemplate),

    initialize: function(){
      _.bindAll(this, 'render', 'doSearch', 'toggleNotes');
      this.notesVisible = true;
    },

    toggleEdit: function(){
      if (location.pathname.search('edit') != -1) {
        this.options.app.navigate(location.pathname.replace('edit', 'slides'), {trigger: true});
      } else if (location.href.search('slide') != -1) {
        this.options.app.navigate(location.pathname.replace('slides', 'edit'), {trigger: true});
      } else {
        this.options.app.navigate('/edit/505c80752932c4db13000007', {trigger: true});
      }
    },

    toggleNotes: function(e) {
      this.notesVisible = !this.notesVisible;
      if (this.notesVisible) {
        this.options.app.trigger('showNotes');
      } else {
        this.options.app.trigger('hideNotes');
      }
      this.render();
    },

    render: function() {
      /* Rendering the element is as simple as converting the Backbone model
       * into an object that just has the data fields (toJSON does this) and
       * passing that into the template.  Use jquery to set the html of the
       * element to the results of the template and we're good to go. */
      this.$el.html(this.template({notesVisible: this.notesVisible}));
      return this;
    },

    doSearch: function(e) {
      e.preventDefault();
      this.options.app.navigate('search/' + this.$('#searchTags').val().split(' ').join(), {trigger: true});
    }
  });

  return FooterView;
});
