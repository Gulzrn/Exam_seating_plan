const express = require('express');
const cors = require('cors');

const studentRoutes = require('./routes/students');
const seatingRoutes = require('./routes/seating');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Exam seating plan API is running' });
});

app.use('/students', studentRoutes);
app.use('/', seatingRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Internal server error' });
});

module.exports = app;

