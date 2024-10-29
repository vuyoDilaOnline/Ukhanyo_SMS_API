const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
    studyMaterials: [{ type: Schema.Types.ObjectId, ref: "StudyMaterial" }],
    announcements: [{ type: Schema.Types.ObjectId, ref: "Announcement" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    marks: [{ type: Schema.Types.ObjectId, ref: "Mark" }],
    attendance: [{ type: Schema.Types.ObjectId, ref: "Attendance" }],
});

module.exports = mongoose.model("Course", courseSchema);
