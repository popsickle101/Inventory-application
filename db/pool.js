
const { Pool } = require("pg");


const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;



module.exports = new Pool({
  connectionString: `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
});
