// create subrouter here
const {
  getRoutineByID,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
} = require("../db");
const express = require("express");
const routineRouter = express.Router();
// export subrouter below here
// Kenny: build out express get, post, patch, delete routes

// gets
routineRouter.get("/", async (req, res, next) => {
  try {
    // get routines
    const routines = getAllPublicRoutines();
    if (routines) {
    } else {
      const error = {
        name: "",
        message: "",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routineRouter.get("/:userId", async (req, res, next) => {
  try {
    // get id from params
    // get routineby userId
    const userId = req.params.userId
    const routines = await getAllRoutinesByUser({ userId });
    if (routines) {
    } else {
      const error = {
        name: "",
        message: "",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

routineRouter.get("/:routineId", async (req, res, next) => {
  try {
    // get id from params
    // get routineby ID
    const id = req.params.routineId;
    const routine = await getRoutineByID({ id });
    if (routine) {
      res.status(200).send(routine);
    } else {
      const error = {
        name: "",
        message: "",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// posts
routineRouter.post("/:routines", async (req, res, next) => {
  try {
    //get id from params
    const {name, goal} = req.body
    // create routine by id
    const createdRoutine = await createRoutine({ name, goal });

    if (createdRoutine) {
      res.status(200).send(createdRoutine);
    } else {
      const error = {
        name: "",
        message: "",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// patches
routineRouter.patch("/:routineId", async (req, res, next) => {
  try {
    //get id from params
    const id = req.params.routineId;
    // updated routine by id
    const updatedRoutine = await updateRoutine(id, { ...req.body});
    if (updatedRoutine) {
      res.status(200).send(updatedRoutine);
    } else {
      const error = {
        name: "",
        message: "",
      };
      res.status(400).send(error);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// deletes
// routineRouter.delete('/:routineId', async (req, res, next) => {
//   try {
//     // get id from params
//     // delete routine by id
//     // need to make deleteRoutine func
//     const deletedRoutine = await deleteRoutine()
//     if (deletedRoutine) {
//       res.status(200).send(deletedRoutine)
//     } else {
//       const error = {
//         name: "",
//         message: ""
//       }
//       res.status(400).send(error)
//     }
//   } catch (error) {
//     res.status(500).send(error)
//   }
// })

module.exports = routineRouter;
