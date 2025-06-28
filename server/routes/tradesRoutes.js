const express = require('express');
const { getAllTrades, addTrade } = require('../controllers/tradesController');

const router = express.Router();

router.get('/', getAllTrades);
router.post('/', addTrade);

module.exports = router;
