// create subrouter here
const express = require("express");
const { getAllActivities, getActivitiesById, createActivity, updateActivity, deleteActivity } = require("../db/Activites");
const activitiesRouter = express.Router();
// export subrouter below here

// Kenny: build out express get, post, patch, delete routes
activitiesRouter.get("/", async (req, res, next) => {
    try {
      const activities = await getAllActivities();
  
      res.status(200).send({
        activities,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error });
    }
  });


activitiesRouter.get('/:activityId', async (req, res, next) => {
    const activityId = req.params.activityId

    try {
        const activitiesById = await getActivitiesById(id)
        console.log(activitiesById)
        res.send({
            activitiesById
        })
    } catch (error) {
        console.log(error)
    }
})
// posts
activitiesRouter.post("/newactivity/:activityId", requireUser, async (req, res, next) => {
    const {name, description} = req.body
    const reviewData = {}

    try {
        reviewData.activityId = req.params.activityId
        reviewData.userId = req.user.id
        reviewData.name = name
        reviewData.description = description
        const createdActivity = await createActivity(reviewData)
        if(createdActivity){
            res.send({createdActivity})
        } else {
            res.send({
                name: "Failed",
                message: "Unable to create Activity"
            })
        }
    } catch (error) {
        console.log(error)
    }
})
// patches

Router.patch('/updateActivity/:activityId', requireUser, async (req, res, next) => {
    const activityId = req.params.activityId;
    const userId = req.params.userId;
    const {name, description} = req.body
    const updateFields = {};

    if (name) {
        updateFields.name = name;
      }
    
      if (description) {
        updateFields.description = description;
      }

    try {
        if(userId == req.user.id){
        const updatedActivity = await updateActivity(activityId, userId, updateFields)
        res.send({
            updatedActivity
        })
        }else{
            next({
                name: "Failed",
                message: 'You need toown the activity to update'
            })
        }

    } catch (error) {
        console.log(error)
    }
})


// deletes
activitiesRouter.delete('/deletereview/:activityId', requireUser, async (req, res, next) => {
    const activityId = req.params.activityId;
    const userId = req.params.userId;

    try {
        const deletedActivity = await deleteActivity(activityId, userId)
        res.send({
            name: "Failed",
            message: "Unable to delete activity"
        })
    } catch (error) {
        console.log(error)
    }
})


module.exports = activitiesRouter;
