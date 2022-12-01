// require client from index
const { client } = require("./index");
// create db functions here

//getRoutineActivityById *
async function getRoutineActivityById(id){
    try {
        const {rows: [routineActivity]} = await client.query(`
        SELECT * 
        FROM routineactivites
        WHERE 'id' = $1;`, [id])
        return routineActivity;
    } catch (error) {
        console.log(error)
    }
}

//getRoutineActivitiesByRoutine *
async function getRoutineActivityById(routineId){
    try {
        const {rows: [routineActivities]} = await client.query(`
        SELECT * 
        FROM routineactivites
        WHERE 'id' = $1;`, [id])
        return routineId;
    } catch (error) {
        console.log(error)
    }
}

// addActivityToRoutine ** (do this in javascript)
async function addActivityToRoutine(routineid, activityid){
    try {
        const {rows: [routine]} = await client.query(`
        INSERT INTO routines(routineid, activityid)
        VALUES ($1,$2)
       RETURNING *;`, [routineid])
        return routine;
    } catch (error) {
        console.log(error)
    }
}

// // getRoutineActivitiesByRoutine [{},{},{}]
// // get activities by activitiesId listed in the result of 'getRoutineActivitiesByRoutine'{} => []
// // get routine by routineID {}
// // add activities rows to routine in js
// // routine.activities = activitiesRows [{},{},{}] => {}
async function getRoutineActivitiesByRoutine(id){
    try {
        const {rows: [routineActivities]} = await client.query(`
        SELECT * 
        FROM routineactivites
        WHERE 'id' = $1;`, [id])
        return routineActivities;
    } catch (error) {
        console.log(error)
    }
}


//updateRoutineActivity * {}
async function updateRoutineActivity(id, fields = {}){
    const keys = Object.keys(fields)
    const values = Object.values(fields)
    if (keys.length === 0){
        return
    }

    const colums = keys.map((el, index) => `"${el}" = $${index + 1}` ).join(", ")

try {
    const { rowCount } = await client.query(`
    UPDATE routineactivites
    SET ${colums}
    WHERE "id" = ${id}
    RETURNING *;`,
    values)
    // console.log(!!rowCount)
} catch (error) {
    console.log(error)
}
}






//destroyRoutineActivity {}

// module.export here
module.exports = {getRoutineActivityById, getRoutineActivityById, addActivityToRoutine, updateRoutineActivity }