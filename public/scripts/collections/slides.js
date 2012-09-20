define(['backbone', 'models/slide'], function(Backbone, Slide) {
  /* Similar to the model, a Backbone collection needs to tell Backbone where
   * to fetch the collection from.  It also needs to map the collection to its
   * corresponding model that it will create for you. */
  var Slides = Backbone.Collection.extend({
    model: Slide,
    url: '/api/slides'
  });

  return Slides;
});
