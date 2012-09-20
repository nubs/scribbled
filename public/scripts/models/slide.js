define(['backbone'], function(Backbone) {
  /* A backbone model wraps a call to the API for the item of interest.  We
   * just need to define a few things to tell it how to fetch the items (if not
   * by id) and what the id field are.  There are also additional things that
   * we can add to take advantage of Backbone. */
  var Slide = Backbone.Model.extend({
    /* We need to override the idAttribute and set it to _id as that is what
     * our simple mongo wrapper will return. */
    idAttribute: '_id',

    /* This, nonfunctional, example shows how we could override the url to pull
     * the models by something other than id. Note that in many cases we won't
     * even be using this as we'll be using the models from the collection. */
    url: function() {
      if(this.isNew()) {
        return '/api/slides';
      } else {
        return '/api/slides/' + this.get('title');
      }
    },

    /* A handy feature of backbone models is the ability to do some client side
     * validation before the put/post request is made to the api.  Here, we
     * validate that the required fields are present. */
    validate: function(attributes) {
      if (!attributes.contents) {
        return 'Slide must have contents.';
      }

      if (!attributes.sourceUrl) {
        return 'Slide must have a source url.';
      }
    }
  });

  return Slide;
});
