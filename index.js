// app.js (ES Modules)

import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mustacheExpress from "mustache-express";

// Recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: false }));

// Serve static files from ./public
app.use(express.static(path.join(__dirname, "./public")));

// Mustache template engine setup
app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");

// Routes
app.get("/serverForm2", (req, res) => {
  res.render("form", {
    title: "Input from form",
    name: "",
    surname: "",
  });
});

app.post("/processForm", (req, res) => {
  const userName = req.body.firstName;
  res.render("formResults", {
    title: "Input from form",
    name: userName,
    surname: req.body.surname,
  });
});

app.post("/processForm2", (req, res) => {
  const userName = req.body.firstName;
  console.log(userName);
  res.render("form", {
    title: "Input from form",
    name: req.body.firstName,
    surname: req.body.surname,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
