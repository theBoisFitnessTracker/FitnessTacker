const { client } = require("./client.js");


async function createActivities({ name, description }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
            INSERT INTO activities(name, description)
            VALUES ($1, $2)
            RETURNING *;
        `,
      [name, description]
    );
    // console.log(routine);
    return routine;
  } catch (error) {
    console.log(error);
  }
}
async function getAllActivities() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM activities;
        `);
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
async function getActivitesById(id) {
  try {
    console.log(id);
    const { rows } = await client.query(
      `
        SELECT * FROM activities
        WHERE "id" = $1;`,
      [id]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
async function updateActivities(id, fields = {}) {
  console.log(id);

  // set Object.keys and Object.values to variables and use those instead.
  const keys = Object.keys(fields);
  const values = Object.values(fields);

  const stringify = keys.map((el, ind) => `${el} = $${ind + 1}`).join(", ");
  // console.log(stringify);
  // console.log(values);
  try {
    await client.query(
      `
        UPDATE activities
        SET ${stringify}
        WHERE "id" = ${id};
        `, // keys.length + 1 replaces ${id}
      values // use values here, and spread it into an array, with id at the end. [...values, id]
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createActivities,
  getAllActivities,
  getActivitesById,
  updateActivities,
};
