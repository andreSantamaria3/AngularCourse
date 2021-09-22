const mysql= require('mysql2');
const { config } = require('yargs');

const configB = require('../config/config.json');

const pool = mysql.createPool({
    host:configB.host,
    user: configB.user,
    database: configB.database,
    password: configB.password
});

module.exports=pool.promise();