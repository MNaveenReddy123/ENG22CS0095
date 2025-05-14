const express = require('express');
const router = express.Router();
const { getCorrelation } = require('../controllers/correlationController');

router.get('/', getCorrelation);

module.exports = router;
