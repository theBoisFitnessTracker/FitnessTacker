// require client from index
const { client } = require("./index");
// create db functions here

// getRoutineByID** (needs activities attached)
async function getRoutineByID(id){
    try {
        const {rows: [routine]} = await client.query(`
        SELECT * 
        FROM routines
        WHERE 'id' = $1;`, [id])
        return routine;
    } catch (error) {
        console.log(error)
    }
}

// getRoutinesWithoutActivities * (get all)
async function getRoutinesWithoutActivities(id){
    try {
        const {rows: [routine]} = await client.query(`
        WITH routines AS (
            SELECT *
            FROM routines
         )
         SELECT *
         FROM routines
         WHERE activies IS = 0;`, [id])
        return routine;
    } catch (error) {
        console.log(error)
    }
}


// getAllPublicRoutines * (get all isPublic true)(needs activities attached)
async function getAllPublicRoutines(id){
    try {
        const {rows: [routine]} = await client.query(`
        WITH routines AS (
            SELECT *
            FROM routines
         )
         SELECT *
         FROM routines
         WHERE ispublic IS true;`, [id])
        return routine;
    } catch (error) {
        console.log(error)
    }
}

// getAllRoutinesByUser ** (needs activities attached)
async function getAllRoutinesByUser(id){
    try {
        const {rows: [routine]} = await client.query(`
        WITH routines AS (
            SELECT *
            FROM routines
         )
         SELECT *
         FROM routines
         WHERE 'id' = $1;`, [id])
        return routine;
    } catch (error) {
        console.log(error)
    }
}


// getPublicRoutinesByUser * (isPublic true)(activities attached)
async function getPublicRoutinesByUser(id){
    try {
        const {rows: [routine]} = await client.query(`
        WITH routines AS (
            SELECT *
            FROM routines
         )
         SELECT *
         FROM routines
         WHERE userid = $1;`, [id])
        return routine;
    } catch (error) {
        console.log(error)
    }
}

// getPublicRoutinesByActivity * (isPublic true)(activities attached)

// createRoutine **
async function createRoutine({name,goal}){
    try{
        const {rows: [routine]} = await client.query(`
        INSERT INTO routines(name, goal)
        VALUES ($1,$2)
        RETURNING *;`, [name,goal])
        return routine
    }catch(error){
        console.log(error)
    }
}

// updateRoutine **
async function updateRoutine(id, fields = {}){
    const keys = Object.keys(fields)
    const values = Object.values(fields)
    if (keys.length === 0){
        return
    }

    const colums = keys.map((el, index) => `"${el}" = $${index + 1}` ).join(", ")

try {
    const { rowCount } = await client.query(`
    UPDATE product
    SET ${colums}
    WHERE "id" = ${id}
    RETURNING *;`,
    values)
} catch (error) {
    console.log(error)
}
}

// destroyRoutine **

// module.export here
