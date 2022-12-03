const { client } = require("./client.js");
module.exports = {
  client,
  ...require("./Users"),
  ...require("./RoutineActivites"),
  ...require("./Activites"),
  ...require("./Routines"),
};
