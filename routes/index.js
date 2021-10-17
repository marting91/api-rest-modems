const express = require('express');
const { matchModels, getFabricantes } = require('../controllers/modemController');
const router = express.Router();

router.get('/fabricantes', getFabricantes);

router.get('/fabricantes/:fabricanteId/modems', matchModels);

module.exports = router;