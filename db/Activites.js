const { Client } = require('pg')

const client = new Client('postgres://localhost:5432/fitness-dev');


async function createActivities({
    id,
    name,
    description = []
  }) {
    try {
      const { rows: [ activitiy ] } = await client.query(`
        INSERT INTO activities(id, name, description) 
        VALUES($1, $2, $3)
        RETURNING *;
      `, [id, name, description]);
  
      return (activitiy.id);
    } catch (error) {
      throw error;
    }
  }
  
  
  async function getAllActivities() {
    try {
      const { rows: activitiyIds } = await client.query(`
        SELECT id
        FROM activities;
      `);
  
      const activities = await Promise.all(activitiyIds.map(
        activitiy => getActivitiesById( activitiy.id )
      ));
  
      return activities;
    } catch (error) {
      throw error;
    }
  }
  
  async function getActivitiesById(idNum) {
    try {
      const { rows: [ activitiy ]  } = await client.query(`
        SELECT *
        FROM activities
        WHERE id= ${idNum};
      `);
  
      return activitiy;
    } catch (error) {
      throw error;
    }
  }
  

  module.exports = {  
    client,
    createActivities,
    getAllActivities,
    getActivitiesById,
    updateActivities
  }