const express = require("express");
const { prototype } = require("router");
const { client } = require("./db");

const app = express();



const PORT = 3000
app.listen(PORT, () => {
  console.log(`we are up and running in port ${PORT}` );
});
