
import express from 'express';
import dotenv from 'dotenv';
import { createTask, updateTask, getTasksWithID, getGroupsWithID, getUserInfoWithID, createGroup} from '../resources/sqlTools.mjs';

dotenv.config({path: '../.env'});

const router = express.Router();

// '/tasks' Routes
router.get("/tasks/:id", (req, res) => {
  console.log("GET request made to /api/tasks");
  //console.log(req.params)

  function queryCallback(rows) {
    if (rows.length > 0) {
      res.status(200).send(JSON.stringify({foundData: 1, Data: rows}));
    }
    else {
      res.status(404).send(JSON.stringify({foundData: 0, Data: "Info could not be found"}));
    }
  }

  getTasksWithID(req.params.id, queryCallback);
});

router.get("/groups/:id", (req, res) => {
  console.log("GET request made to /api/groups");
  //console.log(req.params)

  function queryCallback(rows) {
    if (rows.length > 0) {
      res.status(200).send(JSON.stringify({foundData: 1, Data: rows}));
    }
    else {
      res.status(404).send(JSON.stringify({foundData: 0, Data: "Info could not be found"}));
    }
  }

  getGroupsWithID(req.params.id, queryCallback);
});

router.get("/users/:id", (req, res) => {
  console.log("GET request made to /api/users");
  //console.log(req.params)

  function queryCallback(row) {
    if (row.length > 0) {
      res.status(200).send(JSON.stringify({foundData: 1, Data: row}));
    }
    else {
      res.status(404).send(JSON.stringify({foundData: 0, Data: "Info could not be found"}));
    }
  }

  getUserInfoWithID(req.params.id, queryCallback);
});


router.post("/tasks", (req, res) => {
  console.log("POST request made to /tasks:")
  console.log(req.body)

  console.log(`METHOD: ${req.body._method}`);
  const user_ID = req.get('referer').split('/')[4];

  /*if (!createTask(req.body)) {
    res.status(500).send("Task could not be created. Please reload your dashboard page.")
  }
  */

  // 'queryResultState' is either 1: Query was succesfull or 2: Query failed
  function queryCallback(queryResultState) {
    if (row.length > 0) {
      console.log("test3")
      res.status(200).redirect(`https://localhost${process.env.PORT}/dashboard/${user_ID}`);
    }
    else {
      console.log("test4")
      res.status(404).send(JSON.stringify({queryCompleted: 0}));
    }
  }

  // If _method is 'create' use createTask query
  switch (req.params._method) {
    case "create":
      console.log("test1")
      createTask(req.body, user_ID, queryCallback);
      break;
  // else if _method is 'update' use updateTask query
    case "update":
      console.log("test1")
      updateTask(req.body, user_ID, queryCallback);
      break;
  }

});

router.post("/groups", (req, res) => {
  console.log("POST request made to /groups:")
  console.log(req.body)

  const user_ID = req.get('referer').split('/')[4];
  

  // 'queryResultState' is either 1: Query was succesfull or 2: Query failed
  function queryCallback(queryResultState) {
    if (row.length > 0) {
      res.status(200).send(JSON.stringify({queryCompleted: 1}));
    }
    else {
      res.status(404).send(JSON.stringify({queryCompleted: 0}));
    }
  }

  createGroup(req.body, user_ID, queryCallback);
});


// Dynamic Routes
//router.get("/dashboard/:userEmail", (req, res) => {
//  console.log("Reqeust /dashabord recieved:");
//  console.log(req.params);

//  res.status(200).send("e");
//});

export default router;

