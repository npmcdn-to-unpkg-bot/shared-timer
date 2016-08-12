var mongoose = require('mongoose');

var timerSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  last_time: Date
});

module.exports = mongoose.model('Timer', timerSchema);
