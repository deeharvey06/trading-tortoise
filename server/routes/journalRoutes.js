const express = require('express');
const {
  getJournalByTradeId,
  upsertJournalEntry,
} = require('../controllers/journalController');

const router = express.Router();

router.get('/:tradeId', getJournalByTradeId);
router.post('/', upsertJournalEntry);

module.exports = router;
