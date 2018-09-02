const mongoose = require('mongoose'),
      { Schema } = mongoose;

module.exports = function() {

  // create and register chipmunk schema
  const chipmunkSchema = new Schema({
    name: {
      type: String,
      required: [ true, 'A chipmunk needs a name!' ],
      trim: true,
    },
    age: {
      type: Number,
      required: [ true, 'How old is this chipmunk?' ],
    },
    favoriteNut: {
      type: String,
      trim: true,
      default: 'Acorn',
    },
    treasure: {
      type: String,
      trim: true,
    },
  });
  const Chipmunk = mongoose.model('Chipmunk', chipmunkSchema);

}
