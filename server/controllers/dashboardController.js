const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

exports.getDashboard = async (req, res) => {
  const trades = await prisma.trade.findMany({
    where: { userId: req.user.id },
  });

  const totalTrades = trades.length;
  const wins = trades.filter((t) => t.pnl > 0).length;
  const winRate = totalTrades ? (wins / totalTrades) * 100 : 0;
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);
  const avgHoldTime = totalTrades
    ? trades.reduce((sum, t) => sum + t.holdingTime, 0) / totalTrades
    : 0;

  res.json({ totalTrades, winRate, totalPnl, avgHoldTime });
};
