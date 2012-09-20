define(['backbone'], function(Backbone) {
  /* A backbone model wraps a call to the API for the item of interest.  We
   * just need to define a few things to tell it how to fetch the items (if not
   * by id) and what the id field are.  There are also additional things that
   * we can add to take advantage of Backbone. */
  var Slide = Backbone.Model.extend({
    /* We need to override the idAttribute and set it to _id as that is what
     * our simple mongo wrapper will return. */
    idAttribute: '_id',

    urlRoot: '/api/slides',

    /* A handy feature of backbone models is the ability to do some client side
     * validation before the put/post request is made to the api.  Here, we
     * validate that the required fields are present. */
    validate: function(attributes) {
      if (!attributes.title) {
        return 'Slide must have a title.';
      }

      if (!attributes.imageUrl) {
        return 'Slide must have an image url.';
      }
    }
  });

  return Slide;
});
