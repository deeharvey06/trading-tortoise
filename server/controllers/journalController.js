const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

const getJournalByTradeId = async (req, res) => {
  const { tradeId } = req.params;
  try {
    const journal = await prisma.journalEntry.findUnique({
      where: { tradeId },
    });
    if (!journal) return res.status(404).json({ error: 'Journal not found.' });
    res.json(journal);
  } catch {
    res.status(500).json({ error: 'Failed to fetch journal entry.' });
  }
};

const upsertJournalEntry = async (req, res) => {
  const { tradeId, notes, tags, emotions, setup } = req.body;
  try {
    const journal = await prisma.journalEntry.upsert({
      where: { tradeId },
      update: { notes, tags, emotions, setup },
      create: { tradeId, notes, tags, emotions, setup },
    });
    res.status(200).json(journal);
  } catch {
    res.status(500).json({ error: 'Failed to upsert journal entry.' });
  }
};

module.exports = {
  getJournalByTradeId,
  upsertJournalEntry,
};
