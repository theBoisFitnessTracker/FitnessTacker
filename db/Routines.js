// require client from index
const { client } = require("./client.js");
// create db functions here

// getRoutineByID** (needs activities attached)
async function getRoutineByID(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * 
        FROM routines
        WHERE 'id' = $1;`,
      [id]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
}

// getRoutinesWithoutActivities * (get all)
async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
         SELECT *
         FROM routines;`);
    return routine;
  } catch (error) {
    console.log(error);
  }
}

// getAllPublicRoutines * (get all isPublic true)(needs activities attached)
async function getAllPublicRoutines() {
  try {
    const { rows: routine } = await client.query(`
         SELECT *
         FROM routines
         WHERE ispublic IS true;`);
    return routine;
  } catch (error) {
    console.log(error);
  }
}

// getAllRoutinesByUser ** (needs activities attached)
async function getAllRoutinesByUser(userId) {
  try {
    const { rows: routines } = await client.query(
      `
         SELECT *
         FROM routines
         WHERE 'id' = $1;`,
      [userId]
    );
    return routines;
  } catch (error) {
    console.log(error);
  }
}

// getPublicRoutinesByUser * (isPublic true)(activities attached)
async function getPublicRoutinesByUser(userId) {
  try {
    const { rows: routines } = await client.query(
      `
         SELECT *
         FROM routines
         WHERE userid = $1 AND ispublic IS true ;`,
      [userId]
    );
    return routines;
  } catch (error) {
    console.log(error);
  }
}

// getPublicRoutinesByActivity * (isPublic true)(activities attached)
async function getPublicRoutinesByActivity(activityId) {
  try {
    const { rows: routines } = await client.query(
      `
        SELECT * 
        FROM routines
        WHERE ispublic IS true 
        AND activityid = $1;
        `,
      [activityId]
    );
  } catch (error) {
    console.log(error);
  }
}

// createRoutine **
async function createRoutine({ name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        INSERT INTO routines(name, goal)
        VALUES ($1,$2)
        RETURNING *;`,
      [name, goal]
    );
    return routine;
  } catch (error) {
    console.log(error);
  }
}

// updateRoutine **
async function updateRoutine(id, fields = {}) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  if (keys.length === 0) {
    return;
  }

  const columns = keys.map((el, index) => `"${el}" = $${index + 1}`).join(", ");

  try {
    const { rowCount } = await client.query(
      `
    UPDATE product
    SET ${columns}
    WHERE "id" = ${id}
    RETURNING *;`,
      values
    ); // fix Id, look at routine_activities
  } catch (error) {
    console.log(error);
  }
}

// destroyRoutine **

// module.export here

module.exports = {
  getRoutineByID,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
};
