const { config } = require('../config/config');
const querys = require('./querys');
const mysql = require('mysql2/promise');

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

async function findModems(fabricante) {
    try {
        const [rows] = await connection.execute('SELECT `modem_macaddr`, `ipaddr`, `vsi_model`, `vsi_vendor`, `vsi_swver` FROM `docsis_update` WHERE `vsi_vendor` LIKE ?', [fabricante]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = { findModems, connectDB };