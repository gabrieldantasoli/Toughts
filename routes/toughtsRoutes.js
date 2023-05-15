const express = require('express');
const ToughtController = require('../controllers/ToughtsController');
const router = express.Router();

// helper
const checkAuth1 = require('../helpers/auth').checkAuth;

router.get('/dashboard', checkAuth1, ToughtController.dashboard);
router.get('/', ToughtController.showToughts);

module.exports = router;