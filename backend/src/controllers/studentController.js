const Student = require('../models/Student');

const listStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const { name, roll, class: studentClass } = req.body;

    if (!name || !roll || !studentClass) {
      return res.status(400).json({ message: 'Name, roll, and class are required.' });
    }

    const exists = await Student.findOne({ roll });
    if (exists) {
      return res.status(409).json({ message: 'A student with this roll already exists.' });
    }

    const student = await Student.create({ name, roll, class: studentClass });
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, roll, class: studentClass } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { name, roll, class: studentClass },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(student);
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Student.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json({ message: 'Student removed.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};

