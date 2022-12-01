const pg = require("pg");

const client = new pg.Client(`postgres://localhost:5432/fitness-dev`); // process.env.DB_URL or string

module.exports = { client };
