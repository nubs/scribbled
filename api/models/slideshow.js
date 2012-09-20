module.exports = function(mongoose) {
  var slideshowSchema = new mongoose.Schema({
    title: String,
    slides: [mongoose.Schema.Types.ObjectId],
  });

  return mongoose.model('Slideshow', slideshowSchema);
};
