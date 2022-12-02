const {
  client,
  createActivities,
  getAllActivities,
  getActivitesById,
  updateActivities,
  createUser,
} = require("./index.js");

async function dropTables() {
  try {
    console.log("Starting to drop tables...");

    // have to make sure to drop in correct order
    await client.query(`

        DROP TABLE IF EXISTS routine_activities; 
        DROP TABLE IF EXISTS activities;
        DROP TABLE IF EXISTS routines;
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
      CREATE TABLE routine_activities(
        id SERIAL PRIMARY KEY,
        routineid INTEGER REFERENCES routines(id),
        activityid INTEGER REFERENCES activities(id),
        duration INTEGER NOT NULL,
        count INTEGER NOT NULL
      );
    `); // ADD UNIQUE (column1, column2)
    // 1, 1, 2, 10, 20
    // 2, 1, 3, 5, 10
    // 3, 2, 3, 5, 10
    // 4, 1, 3, 10, 30 x1, 3 already exists
  } catch (error) {
    console.log(error);
  }
}

async function createUsersPromiseArray(num) {
  const array = [];
  for (let i = 1; i <= num; i++) {
    const user = createUser({
      username: `FartingCHickenHead${i}`,
      password: `LammasOnSunday${i}`,
    });
    array.push(user);
  }
  const result = await Promise.all(array);
  console.log(
    `added ${
      result.filter((u) => (u == undefined ? false : true)).length
    } number of users`
  );
  return result;
}

// do this ^ for routines, activities (5) hardcode a few routine_activities.

async function TestDB() {
  client.connect();
  await dropTables();
  await createTables();
  await createUser({
    username: "FartingCHickenHead1",
    password: "LammasOnSunday1",
  });
  await createUsersPromiseArray(20);
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

  // create Routines

  // update routines

  // delete a routine

  // create routine_activities

  // update routine_activities

  client.end();
}

TestDB();

//Boobs
