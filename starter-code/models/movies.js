const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  actors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'celebrity'
    }] 
});

const Movie = mongoose.model('movie', moviesSchema);
module.exports = Movie;