const express = require("express");
const { prototype } = require("router");
const { client } = require("./db");
// install and require 'morgan'
// install and require 'cors'
// require apiRouter here
const app = express();

// use morgan here
// body parsers here (json and urlencoded)

// consume your apiRouter here

const PORT = 3000; // get PORT from process.env or if process.env.PORT doesn't exist, then 3000
app.listen(PORT, () => {
  console.log(`we are up and running in port ${PORT}`);
});
