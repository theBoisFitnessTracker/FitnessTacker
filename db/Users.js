const { client } = require("./index");

/**
 * USER Methods
 */

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
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
  // make values for Object.keys and Object.values

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
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields) // see Activities.js
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
      SELECT username
      FROM users;
    `);

    // get * from users, then users.map((user) => {
    //   delete user.password
    //   return user
    // })

    return rows;
  } catch (error) {
    throw error;
  }
}
// getUserById
// getUserByUsername

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
};
