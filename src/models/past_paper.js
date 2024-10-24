const mongoose = require('mongoose');

const pastPaperSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  paper: { type: Number, required: true },
  link: { type: String, required: true },
  year: { type: Number, required: true }, 
  term: { type: Number, required: true },
}, { timestamps: true }
);

module.exports = mongoose.model('PastPaper', pastPaperSchema);
// @add timestamp