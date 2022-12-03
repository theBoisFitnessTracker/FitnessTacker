// require client from index
const { client } = require("./client.js");
// create db functions here

//getRoutineActivityById *
async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(
      `
        SELECT * 
        FROM routine_activites
        WHERE 'id' = $1;
        `,
      [id]
    );
    return routineActivity;
  } catch (error) {
    console.log(error);
  }
}

// addActivityToRoutine ** (do this in javascript)
async function addActivityToRoutine(routineid, activityid, duration, count) {
  //need set and duration
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
        INSERT INTO routine_activities(routineid, activityid, duration, count )
        VALUES ($1, $2, $3, $4)
       RETURNING *;`,
      [routineid, activityid, duration, count]
    );
    return routine_activity;
  } catch (error) {
    console.log(error);
  }
}

// // getRoutineActivitiesByRoutine [{},{},{}]
// // get activities by activitiesId listed in the result of 'getRoutineActivitiesByRoutine'{} => []
// // get routine by routineID {}
// // add activities rows to routine in js
// // routine.activities = activitiesRows [{},{},{}] => {}

async function getRoutineActivitiesByRoutine(routineId) {
  try {
    const { rows: routineActivities } = await client.query(
      `
        SELECT * 
        FROM routine_activites
        WHERE 'routineid' = $1;`,
      [routineId]
    );
    return routineActivities;
  } catch (error) {
    console.log(error);
  }
}
// use this to attach activities to routines
// have the routineId -> get routine
// use getRoutineActivitiesByRoutine to get all activities for the routine
// routine.activities = await getRoutineActivitiesByRoutine(routineId)

//updateRoutineActivity * {}
async function updateRoutineActivity(id, fields = {}) {
  const keys = Object.keys(fields);
  const values = Object.values(fields);
  if (keys.length === 0) {
    return;
  }

  const columns = keys.map((el, index) => `"${el}" = $${index + 1}`).join(", ");
  // 5 keys, length of 5, last index is 4.

  try {
    const { rows } = await client.query(
      `
    UPDATE routine_activites
    SET ${columns}
    WHERE "id" = $${keys.length + 1}
    RETURNING *;`,
      [...values, id]
    ); // [...values, id]
    // "id" = $${keys.length + 1} length is 5 + 1 = 6
    // console.log(!!rows.length)
    return rows;
  } catch (error) {
    console.log(error);
  }
}

//destroyRoutineActivity {}

// module.export here
module.exports = {
  getRoutineActivityById,
  getRoutineActivitiesByRoutine,
  addActivityToRoutine,
  updateRoutineActivity,
};
