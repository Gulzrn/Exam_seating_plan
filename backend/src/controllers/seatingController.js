const Student = require('../models/Student');
const generateSeatingPlan = require('../utils/seatingGenerator');

const generateSeating = async (req, res, next) => {
  try {
    const { rows, columns } = req.body;

    const parsedRows = Number(rows);
    const parsedCols = Number(columns);

    if (!parsedRows || !parsedCols || parsedRows <= 0 || parsedCols <= 0) {
      return res.status(400).json({ message: 'Rows and columns must be positive numbers.' });
    }

    const students = await Student.find();
    if (students.length > parsedRows * parsedCols) {
      return res.status(400).json({
        message: 'Not enough seats for all students. Add more rows/columns.',
      });
    }
    const plan = generateSeatingPlan(students, parsedRows, parsedCols);

    if (!plan) {
      return res.status(422).json({
        message: 'Cannot generate conflict-free seating plan with given class distribution.',
      });
    }

    res.json({
      rows: parsedRows,
      columns: parsedCols,
      seats: plan,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateSeating,
};

