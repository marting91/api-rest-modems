const { findModems } = require('../db/db');
const { models: modelsJSON } = require('../models.json');

exports.matchModels = async (req, res) => {
    const result = await findModems(req.params.fabricanteId);
    const notMatchModels = result.filter(modem => modelsJSON.findIndex(model => model.vendor === modem.vsi_vendor && model.name === modem.vsi_model) === -1);
    console.log(notMatchModels);
    res.send({
        'cant modelos consultados': result.length,
        'cantidad modelos que no complen': notMatchModels.length,
        'modelos consultados': result,
        'modelos que no cumplen': notMatchModels
    });
}