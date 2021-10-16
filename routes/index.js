const express = require('express');
const { matchModels } = require('../controllers/modemController');
const router = express.Router();


router.get('/', (req, res) => {
    res.send("Home");
});

router.get('/fabricantes/:fabricanteId/modems', matchModels);

module.exports = router;