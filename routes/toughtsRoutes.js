const express = require('express');
const ToughtController = require('../controllers/ToughtsController');
const router = express.Router();

// helper
const checkAuth1 = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth1, ToughtController.createTought);
router.post('/add', checkAuth1, ToughtController.createToughtSave);
router.get('/edit/:id', checkAuth1, ToughtController.updateTought);
router.get('/dashboard', checkAuth1, ToughtController.dashboard);
router.post('/remove', checkAuth1, ToughtController.removeToughtSave);
router.get('/', ToughtController.showToughts);

module.exports = router;