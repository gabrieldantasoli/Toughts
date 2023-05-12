const express = require('express');
const ToughtController = require('../controllers/ToughtsController');
const router = express.Router();

// helper
const checkAuth = require('../helpers/auth').checkAuth

router.get('/dashboard', checkAuth, ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;