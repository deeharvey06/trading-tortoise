const express = require('express');
const multer = require('multer');
const { importTradesFromCSV } = require('../controllers/csvImportController');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/', upload.single('file'), importTradesFromCSV);

module.exports = router;
