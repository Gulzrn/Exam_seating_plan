const express = require('express');
const { generateSeating } = require('../controllers/seatingController');

const router = express.Router();

router.post('/generate-seating', generateSeating);

module.exports = router;

