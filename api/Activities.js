// create subrouter here
const {
  createActivities,
  getAllActivities,
  getActivitesById,
  updateActivities,
} = require('../db')
const express = require("express");
const activitiesRouter = express.Router();
// export subrouter below here

// Kenny: build out express get, post, patch, delete routes
activitiesRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    if (activities) {
      res.status(200).send(activities);
    } else {
      const error = {
        name: "cannotGetActivities",
        message: "Unable to get activities, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

activitiesRouter.get("/:activityId", async (req, res, next) => {
  try {
    // need to get activityID from params
    // need to input activityID into "get" function
    const activityById = await getActivitesById({id});
    if (activityById) {
      res.status(200).send(activityById);
    } else {
      const error = {
        name: "cannotGetActivity",
        message: "Unable to get activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// posts
activitiesRouter.post("/:activities", async (req, res, next) => {
  try {
    // need to use 
    const createActivity = await createActivities({name, description});
    if (createActivity) {
      res.status(200).send(createdActivity);
    } else {
      const error = {
        name: "cannotPostActivity",
        message: "Unable to create activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// patches
activitiesRouter.patch("/:activityId", async (req, res, next) => {
  try {
    const updateActivity = await updateActivities(id, {...fields});
    if (updateActivity) {
      res.status(200).send(updatedActivtiy);
    } else {
      const error = {
        name: "cannotUpdateActivity",
        message: "Cannot update activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// deletes
activitiesRouter.delete("/:activityId", async (req, res, next) => {
  try {
    // get id from params
    // delete activity using id
    // do not have a delete function written yet.
   const deletedActivity= await deleteActivity();
    if (deletedActivity) {
      res.status(200).send(deletedActivity);
    } else {
      const error = {
        name: "cannotDeleteActivity",
        message: "Cannot delete Activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = activitiesRouter;
