const pg = require('pg')

const client = new pg.Client(`postgres://localhost5432/fitness-dev`);

module.exports = {
    client
}