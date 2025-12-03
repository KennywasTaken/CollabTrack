
import express from 'express';
import { createTask, updateTask } from '../resources/sqlTools.mjs';

const router = express.Router();

// '/tasks' Routes
router.get("/", (req, res) => {
  console.log("GET request made to /tasks");
  console.log(req.body)

  res.status(400).send("Bad Request");
});

router.get("/:userID", (req, res) => {
  console.log("GET request made to /tasks/?userID:");
  console.log(req.params.userID);

  res.status(200).send("Getting tasks...");
});

router.post("/", (req, res) => {
  console.log("POST request made to /tasks:")
  console.log(req.body)

  console.log(`METHOD: ${req.body._method}`);

  if (!createTask(req.body)) {
    res.status(500).send("Task could not be created")
  }

  res.status(200).send("Task Created Succesfully")
});


// Dynamic Routes
//router.get("/dashboard/:userEmail", (req, res) => {
//  console.log("Reqeust /dashabord recieved:");
//  console.log(req.params);

//  res.status(200).send("e");
//});

export default router;

