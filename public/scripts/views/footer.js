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
    zoomed: false,
    events: {
      submit: 'doSearch',
      'click #toggleNotes': 'toggleNotes',
      'click #edit': 'toggleEdit',
      'click #fullscreen': 'toggleFullscreen',
      'click #learn': 'learningRegistry',
      'click #zoomOut': 'zoomOut'
    },

    zoomOut: function(){
      this.options.app.trigger('zoomOut');
      this.zoomed=false;
      this.render();
    },

    zoomIn: function(){
      this.zoomed=true;
      this.render();
    },

    learningRegistry: function(){
      $.ajax({
        dataType: 'jsonp',
        url: 'http://node01.public.learningregistry.net/slice',
        type: 'GET',
        data: {
          any_tags:'shark'
        },
        success: function(data){
          var lrDialog = $('<div style="overflow:scroll; width:100%; height:100%;"></div>');
          $.each(data.documents, function(index, value){
            var link = value.resource_data_description.resource_locator;
            console.log(link);
            lrDialog.append('<input type="checkbox"/><a href="' + link + '">' + link + '</a><BR>');
          });
          lrDialog.dialog({title:'Learning Registry', minWidth:500});
        }
      });
    },

    /* We loaded the template into the startTemplate above, now we go ahead and
     * compile the template into a function that takes the parameters that the
     * template expects as a parameter. */
    template: Handlebars.compile(footerTemplate),

    initialize: function(){
      _.bindAll(this, 'render', 'doSearch', 'toggleNotes', 'saveModel', 'resetFullscreen', 'zoomIn', 'zoomOut');
      this.options.app.on('modelChanged', this.saveModel);
      this.options.app.on('zoomIn', this.zoomIn);
      this.notesVisible = true;
      this.editing = location.pathname.search('edit') != -1;
      this.fullscreen = false;
      $(document).on('fullscreenchange', this.resetFullscreen);
      $(document).on('mozfullscreenchange', this.resetFullscreen);
      $(document).on('webkitfullscreenchange', this.resetFullscreen);
    },

    saveModel: function(model) {
      this.model = model;
    },

    toggleEdit: function(){
      this.editing = !this.editing;
      if (location.pathname.search('edit') != -1) {
        this.options.app.navigate(location.pathname.replace('edit', 'slides'), {trigger: true});
      } else if (location.href.search('slide') != -1) {
        this.options.app.navigate(location.pathname.replace('slides', 'edit'), {trigger: true});
      } else {
        this.options.app.navigate('/edit/505c80752932c4db13000007', {trigger: true});
      }
      this.zoomed = false;
      this.render();
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

    resetFullscreen: function(e) {
      this.fullscreen = document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
      this.render();
    },

    toggleFullscreen: function(e) {
      this.fullscreen = !this.fullscreen;
      if (this.fullscreen) {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
      }
      this.render();
    },

    render: function() {
      /* Rendering the element is as simple as converting the Backbone model
       * into an object that just has the data fields (toJSON does this) and
       * passing that into the template.  Use jquery to set the html of the
       * element to the results of the template and we're good to go. */
      this.$el.html(this.template({
        notesVisible: this.notesVisible,
        editing: this.editing,
        fullscreen: this.fullscreen,
        url: location.href,
        notZoomed: !this.zoomed
      }));
      return this;
    },

    doSearch: function(e) {
      e.preventDefault();
      this.options.app.navigate('search/' + this.$('#searchTags').val().split(' ').join(), {trigger: true});
    }
  });

  return FooterView;
});
