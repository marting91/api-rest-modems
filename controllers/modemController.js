const { findModems, getVendors, addModem } = require('../db/db');
const { models: modelsJSON } = require('../db/models.json');

exports.matchModels = async (req, res) => {
	try {
		const result = await findModems(req.params.fabricanteId);
		const notMatchModels = result.filter(
			modem => modelsJSON.findIndex(
				model => modem.vsi_vendor.toLowerCase().includes(model.vendor.toLowerCase())
					&& model.name === modem.vsi_model && model.soft === modem.vsi_swver) === -1);
		res.status(200).json(notMatchModels);
	} catch (error) {
		res.status(500).json({ msg: "Error al consultar los modelos de modems" });
	}
}

exports.getFabricantes = async (req, res) => {
	try {
		const vendors = await getVendors();
		res.status(200).json(vendors);
	} catch (error) {
		res.status(500).json({ msg: "Error al consultar los fabricantes" });

	}
}

exports.addModel = async (req, res) => {
	try {
		const result = await addModem(req.body);
		res.status(201).json(result);
	} catch (error) {
		res.status(500).json({ msg: "Error al agregar modelo" });
	}

}