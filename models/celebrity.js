const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const celibritySchema = new Schema({
  name : String,
  occupation : String,
  catchPhrase  : String,
});

const Celebrity = mongoose.model('celebrity', celibritySchema);
module.exports = Celebrity;