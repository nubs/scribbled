define(['backbone'], function(Backbone) {
  /* A backbone model wraps a call to the API for the item of interest.  We
   * just need to define a few things to tell it how to fetch the items (if not
   * by id) and what the id field are.  There are also additional things that
   * we can add to take advantage of Backbone. */
  var Note = Backbone.Model.extend({
    /* We need to override the idAttribute and set it to _id as that is what
     * our simple mongo wrapper will return. */
    idAttribute: '_id',

    url: function() {
      return '/api/slides/' + this.get('slideId')  + '/notes/' + this.get('_id');
    }
  });

  return Note;
});
