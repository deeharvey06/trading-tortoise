const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

const importTradesFromCSV = async (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: 'CSV file is required.' });

  const trades = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      try {
        const {
          ticker,
          side,
          entryPrice,
          exitPrice,
          quantity,
          entryTime,
          exitTime,
        } = row;

        const parsedEntry = new Date(entryTime);
        const parsedExit = new Date(exitTime);
        const pnl =
          (parseFloat(exitPrice) - parseFloat(entryPrice)) *
          parseInt(quantity) *
          (side === 'short' ? -1 : 1);
        const holdingMins = Math.floor((parsedExit - parsedEntry) / 60000);

        trades.push({
          ticker,
          side,
          entryPrice: parseFloat(entryPrice),
          exitPrice: parseFloat(exitPrice),
          quantity: parseInt(quantity),
          entryTime: parsedEntry,
          exitTime: parsedExit,
          pnl,
          holdingMins,
        });
      } catch (error) {
        console.error('Error parsing row:', error);
      }
    })
    .on('end', async () => {
      try {
        const created = await prisma.trade.createMany({ data: trades });
        fs.unlinkSync(filePath);
        res.status(201).json({ message: `${created.count} trades imported.` });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to import trades from CSV.' });
      }
    });
};

module.exports = {
  importTradesFromCSV,
};
