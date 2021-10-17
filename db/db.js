const { config } = require('../config/config');
const querys = require('./querys');
const mysql = require('mysql2/promise');
const editJsonFile = require('edit-json-file');

let connection;

async function connectDB() {
    connection = await mysql.createConnection({ host: config.dbHost, port: config.dbPort, user: config.dbUser, password: config.dbPassword, database: config.dbName })
    await connection.query(querys.sqlMode);
    await connection.query(querys.dropTable);
    await connection.query(querys.createTable);
    for (let query of querys.inserts) {
        await connection.query(query);
    }
    console.log('BD Conectada');
}

async function findModems(vendor) {
    try {
        const [rows] = await connection.execute('SELECT `modem_macaddr`, `ipaddr`, `vsi_model`, `vsi_vendor`, `vsi_swver` FROM `docsis_update` WHERE `vsi_vendor` LIKE ?', [vendor]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

// Obtener todos los vendedores
async function getVendors() {
    try {
        const [vendors] = await connection.execute("SELECT distinct(`vsi_vendor`) FROM `docsis_update` WHERE `vsi_vendor` <> '';");
        return vendors;
    } catch (error) {
        console.log(error);
    }
}

async function addModem(modem) {

    // Abro el archivo JSON y agrego el modelo solicitado
    let file = editJsonFile(`${__dirname}/models.json`);
    file.append('models', modem);
    file.save();
    return file.get();

}

module.exports = { connectDB, findModems, getVendors, addModem };
