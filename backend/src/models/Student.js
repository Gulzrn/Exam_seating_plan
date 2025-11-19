const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    class: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

