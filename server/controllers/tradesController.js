const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

const getAllTrades = async (_req, res) => {
  try {
    const trades = await prisma.trade.findMany({ include: { journal: true } });
    res.json(trades);
  } catch {
    res.status(500).json({ error: 'Failed to fetch trades.' });
  }
};

const addTrade = async (req, res) => {
  const {
    ticker,
    side,
    entryPrice,
    exitPrice,
    quantity,
    entryTime,
    exitTime,
    pnl,
  } = req.body;

  try {
    const trade = await prisma.trade.create({
      data: {
        ticker,
        side,
        entryPrice,
        exitPrice,
        quantity,
        entryTime: new Date(entryTime),
        exitTime: new Date(exitTime),
        pnl,
      },
    });
    res.status(201).json(trade);
  } catch {
    res.status(500).json({ error: 'Failed to add trade.' });
  }
};

module.exports = {
  getAllTrades,
  addTrade,
};
