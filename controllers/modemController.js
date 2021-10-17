const { findModems, getVendors, addModem } = require('../db/db');
const { models: modelsJSON } = require('../db/models.json');

exports.matchModels = async (req, res) => {
    const result = await findModems(req.params.fabricanteId);
    const notMatchModels = result.filter(
        modem => modelsJSON.findIndex(
            model => modem.vsi_vendor.toLowerCase().includes(model.vendor.toLowerCase())
                && model.name === modem.vsi_model) === -1);
    // console.log(result[0].vsi_vendor.toLowerCase().includes('cisco'));
    // res.json({
    //     'cant modelos consultados': result.length,
    //     'cantidad modelos que no complen': notMatchModels.length,
    //     'modelos consultados': result,
    //     'modelos que no cumplen': notMatchModels
    // });
    res.json(notMatchModels);
}

exports.getFabricantes = async (req, res) => {
    const vendors = await getVendors();
    res.json(vendors)
}

exports.addModel = async (req, res) => {
    console.log(req.body);
    const result = await addModem(req.body);
    res.json(result);
}