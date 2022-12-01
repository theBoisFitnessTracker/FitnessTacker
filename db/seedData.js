const { client } = require("./index");
const {
  createActivities,
  getAllActivities,
  getActivitesById,
  updateActivities,
} = require("./Activites");
const { createUser } = require("./Users");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`

        DROP TABLE IF EXISTS routineactivities; 
        DROP TABLE IF EXISTS routines;
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS users;
        
      `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}
async function createTables() {
  try {
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE activities(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description text NOT NULL
      );
      CREATE TABLE routines(
        id SERIAL PRIMARY KEY,
        creatorid INTEGER REFERENCES users(id),
        ispublic BOOLEAN DEFAULT 'false',
        name VARCHAR(255) UNIQUE NOT NULL,
        goal text NOT NULL
      );
      CREATE TABLE routineactivities(
        id SERIAL PRIMARY KEY,
        routineid INTEGER REFERENCES routines(id),
        activityid INTEGER REFERENCES activities(id),
        duration INTEGER NOT NULL,
        count INTEGER NOT NULL
      );
    `);
  } catch (error) {
    console.log(error);
  }
}

async function TestDB() {
  client.connect();
  await dropTables();
  await createTables();
  await createUser({
    username: "FartingCHickenHead",
    password: "LammasOnSunday",
  });
  await createActivities({
    name: "Bench press",
    description: "Barbell bench press for pectoral muscles",
  });
  await createActivities({
    name: "Goblet squat",
    description: "Dumbbell front positioned squat for quadriceps",
  });
  await createActivities({
    name: "Shoulder press",
    description: "Dumbbell press for shoulder muscles",
  });
  // await getActivitesById(1);
  // // await getAllActivities();
  await updateActivities(1, {
    name: "Branch Chest",
    description: "Eating Branches",
  });
  client.end();
}

TestDB();

//Boobs
