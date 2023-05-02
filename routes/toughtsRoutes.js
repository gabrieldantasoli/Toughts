const express = require('express');
const ToughtController = require('../controllers/ToughtsController');
const router = express.Router();


router.get('/', ToughtController.showToughts);

module.exports = router;