const express = require('express');
const router = express.Router();
const { getAveragePrice } = require('../controllers/averageController');

router.get('/:ticker', getAveragePrice);

module.exports = router;
