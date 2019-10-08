const express = require("express");
const app = express();

const router = require("./router");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
// setting the view of html with ejs engine. I will explore about that
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
