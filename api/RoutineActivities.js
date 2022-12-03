// create subrouter here
const {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
} = require("../db");
const express = require("express");
const raRouter = express.Router();
// export subrouter below here
// Kenny: build out express get, post, patch, delete routes

// gets
raRouter.get("/:raId", async (req, res, next) => {
  try {
    const id = req.params.raId;
    // need to get routine_activity by ID - raId
    // need to use raId in the function
    const routineActivity = await getRoutineActivityById({ id });
    if (routineActivity) {
      res.status(200).send(routineActivity);
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

raRouter.get("/:routineId", async (req, res, next) => {
  try {
    const routineId = req.params.routineId;
    const routineActivity = await getRoutineActivitiesByRoutine({ routineId });
    if (routineActivity) {
      res.status(200).send(routineActivity);
    } else {
      const error = {
        name: "cannotGetRoutineActivity",
        message: "Unable to get routine activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// posts
raRouter.post("/:routineId", async (req, res, next) => {
  try {
    const routineId = req.params.routineId;
    const { activityId, duration, count } = req.body;
    const acitvity = await addActivityToRoutine({
      routineId,
      activityId,
      duration,
      count,
    });
    if (acitvity) {
      res.status(200).send(acitvity);
    } else {
      const error = {
        name: "cannotAddActivity",
        message: "Unable to add activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// patches
raRouter.patch("/:raId", async (req, res, next) => {
  try {
    const routineId = req.params.raId;
    const routineActivity = await updateRoutineActivity(id, {...req.body });
    if (routineActivity) {
      res.status(200).send(routineActivity);
    } else {
      const error = {
        name: "cannotUpdateRoutineActivity",
        message: "Unable to update activity, try again later",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// deletes
// raRouter.delete("/:raId", async (req, res, next) => {
//   try {
//     const id = ??
//   } catch (error) {}
// });

module.exports = raRouter;
