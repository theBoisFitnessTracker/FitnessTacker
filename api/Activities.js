// create subrouter here
const express = require("express");
const activitiesRouter = express.Router();
// export subrouter below here

// Kenny: build out express get, post, patch, delete routes
activitiesRouter.get("/", (req, res, next) => {});

activitiesRouter.get('/:activityId', (req, res, next) => {})

// posts

// patches

// deletes

module.exports = activitiesRouter;
