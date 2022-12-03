const { client } = require("./client.js");

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
    console.log(`new User: `, user);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, fields = {}) {
  // make values for Object.keys and Object.values
  const keys = Object.keys(fields)
  const values = Object.values(fields)

  // build the set string
  const setString = keys
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) return
  

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${keys.length + 1}
      RETURNING *;
    `,
      [...values, id] // see Activities.js
    ); // fix id=${id} issue
    delete user.password
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

async function getUserById({ id }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM user
      WHERE id = $1
    ;`,
      [id]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}
// getUserByUsername
async function getUserByUsername({ username }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM user
      WHERE username = $1
    ;`,
      [id]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
