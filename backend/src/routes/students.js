const express = require('express');
const {
  listStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

const router = express.Router();

router.get('/', listStudents);
router.post('/', createStudent);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;

