// create subrouter here
const express = require("express");
const activitiesRouter = express.Router();
// export subrouter below here

// Kenny: build out express get, post, patch, delete routes
activitiesRouter.get("/", (req, res, next) => {});

module.exports = activitiesRouter;
