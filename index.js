const express = require("express");
const { prototype } = require("router");
const { client } = require("./db");
const apiRouter = require("./api");
require("dotenv").config();
// install and require 'morgan'
const morgan = require("morgan");
// install and require 'cors'
const cors = require("cors");
// require apiRouter here
const app = express();
app.use(cors());

// use morgan here
app.use(morgan("dev"));
// body parsers here (json and urlencoded)
app.use(express.json());
// 2) Encoded HTML form body parsing
app.use(express.urlencoded({ extended: false }));
// consume your apiRouter here
app.use("/api", apiRouter);
client.connect();

// get PORT from process.env or if process.env.PORT doesn't exist, then 3000
// || operator: if any of these things are true return the first true thing
// && operator: all things are true it gives you the last thing in the list otherwise returns false
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`we are up and running in port ${PORT}`);
});
