const express = require("express");
const { client } = require("./db");

const app = express();

client.connect();

app.listen(3000, () => {
  console.log("we are up and running");
});
