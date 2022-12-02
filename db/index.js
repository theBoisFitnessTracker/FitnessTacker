const pg = require("pg");
// requiring env
require("dotenv").config()
const client = new pg.Client(process.env.DB_URL ||  `postgres://localhost:5432/fitness-dev`); // process.env.DB_URL or string
// export functions from database files from workshop
// eg ...require('./users') in module.exports
const {} = require("./RoutineActivites");
module.exports = { client };
