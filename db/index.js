const pg = require("pg");

const client = new pg.Client(`postgres://localhost:5432/fitness-dev`); // process.env.DB_URL or string
// export functions from database files from workshop
// eg ...require('./users') in module.exports
module.exports = { client };
