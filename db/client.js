const pg = require("pg");
// requiring env
require("dotenv").config();
const client = new pg.Client(
  process.env.DB_URL || `postgres://localhost:5432/fitness-dev`
);
module.exports = { client };