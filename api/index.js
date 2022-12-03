// api subrouter goes here
const express = require('express');
const apiRouter = express.Router()
const raRouter = require('./RoutineActivities')
const activitiesRouter = require('./Activities')
const usersRouter = require('./Users')
const routineRouter = require('./Routines');


// routineActivities subrouter use here

// routine subrouter use here
// users subrouter use here
// activities subrouter use here








apiRouter.use('/activities', activitiesRouter);
apiRouter.use('/routines', routineRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/ra', raRouter);



module.exports = apiRouter