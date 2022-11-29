const { Client } = require("./index")

/**
 * USER Methods
 */

async function createUser({ username, password }) {
  try {
    const {
      rows: [user]
    } = await Client.query(
      `
      INSERT INTO users(username, password) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
    `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await Client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await Client.query(`
      SELECT username
      FROM users;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  Client,
  createUser,
  updateUser,
  getAllUsers,
};
