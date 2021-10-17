const express = require('express');
const { matchModels, getFabricantes, addModel } = require('../controllers/modemController');
const router = express.Router();

router.get('/fabricantes', getFabricantes);

router.get('/fabricantes/:fabricanteId/modems', matchModels);

router.post('/fabricantes/:fabricanteId/modems', addModel);

module.exports = router;