module.exports = function(mongoose) {
  var slideshowSchema = new mongoose.Schema({
    title: String,
    slides: [Schema.Types.ObjectId],
  });

  return mongoose.model('Slideshow', slideshowSchema);
};
