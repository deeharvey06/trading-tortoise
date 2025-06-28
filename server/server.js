const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const cors = require('cors');

const tradesRouter = require('./routes/tradesRoutes');
const journalRouter = require('./routes/journalRoutes');
const authRouter = require('./routes/authRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const importRoute = require('./routes/csvImportRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.send('Welcome to the Trading Journal API');
});

app.use('/api/trades', tradesRouter);
app.use('/api/journal', journalRouter);
app.use('/api/auth', authRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/import-trades', importRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
