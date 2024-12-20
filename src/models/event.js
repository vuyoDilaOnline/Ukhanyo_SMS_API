const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    start: {type: String},
    end: {type: String},
    type: {type: String}
}, {timestamps: true});

eventSchema.method("toJSON", function() {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});


module.exports = mongoose.model('Event', eventSchema);
