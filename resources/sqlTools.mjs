
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const sql3 = sqlite3.verbose();
const DB = new sql3.Database("Database.db", sqlite3.OPEN_READWRITE, connectDB);

function connectDB(err) {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("DB has connected.")
}

async function getUserInfoWithEmail(Email, callback) {
 DB.all(userInfoWithEmailQuery(Email), [], (err, rows) => {
  if (err) {
     console.log("Error running 'getUserInfoWithEmail' SQL Query:");
     console.log(err)
     callback(null)
   }

   // Cant return row data directly since query is async so we use callbacks
   callback(rows);
 });
}

async function getUserInfoWithID(ID, callback) {
 DB.all(userInfoWithIDQuery(ID), [], (err, rows) => {
  if (err) {
     console.log("Error running 'getUserInfoWithID' SQL Query:");
     console.log(err)
     callback(null)
   }

   // Cant return row data directly since query is async so we use callbacks
   callback(rows);
 });
}

async function getTasksWithID(ID, callback) {
 DB.all(userTasksWithIDQuery(ID), [], (err, rows) => {
   if (err) {
     console.log("Error running 'getTasksWithID' SQL Query:");
     console.log(err)
     callback(null)
   }

   // Cant return row data directly since query is async so we use callbacks
   callback(rows);
 });
}

async function getGroupsWithID(ID, callback) {
 DB.all(userGroupsWithIDQuery(ID), [], (err, rows) => {
   if (err) {
     console.log("Error running 'getGroupsWithID' SQL Query:");
     console.log(err)
     callback(null)
   }

   // Cant return row data directly since query is async so we use callbacks
   callback(rows);
 });
}


async function createTask(FormInfo, user_ID, callback) {
  console.log("Creating Task....")
  console.log(FormInfo);

  let resp = DB.run(createTaskQuery(FormInfo, user_ID), [], (err) => {
    if (err) {
     console.log("Error running 'createTask' SQL Query");
     callback(0); // Sending 'false' back to indicate query failed
   }

   console.log(resp);

   callback(1); // Sending 'true' back to indicate query was sucessful
  });
}

async function updateTask(FormInfo, user_ID, callback) {
  console.log("Updating Task....");
  console.log(FormInfo);

  let resp = DB.run(updateTaskQuery(FormInfo, user_ID), [], (err) => {
    if (err) {
     console.log("Error running 'updateTask' SQL Query");

     callback(0); // Sending 'false' back to indicate query failed
   }

   console.log(resp);

   callback(1); // Sending 'true' back to indicate query was sucessful
  });
}

async function createGroup(GroupInfo, userID) {
  console.log("Creating Group....")
  console.log(GroupInfo);

  let resp = DB.run(createGroupQuery(GroupInfo, userID), [], (err) => {
    if (err) {
     console.log("Error running 'createGroup' SQL Query");

     callback(0); // Sending 'false' back to indicate query failed
   }

   console.log(resp);

   callback(1); // Sending 'true' back to indicate query was sucessful
  });
}

export { DB, getUserInfoWithEmail,getTasksWithID, getGroupsWithID, getUserInfoWithID,createTask, updateTask, createGroup };


function userInfoWithEmailQuery(user_id) { 
  return `SELECT * FROM Users WHERE email=${user_id}`;
};

function userInfoWithIDQuery(user_id) { 
  return `SELECT * FROM Users WHERE user_id=${user_id}`;
};

function userTasksWithIDQuery(user_id) { 
  return `SELECT * FROM User_Tasks WHERE owner_id=${user_id}`;
};

function userGroupsWithIDQuery(user_id) { 
  return `SELECT * FROM Group_Members WHERE user_id=${user_id}`;
};

function createTaskQuery(TaskInfo, user_id) {
  return `INSERT INTO User_Tasks (owner_id, task_name, description, importance, urgency, due_date) VALUES (${user_id}, ${TaskInfo.taskName}, ${TaskInfo.taskDescription}, ${taskImportance}, ${taskUrgency}, ${taskDuedate}, ${taskDuedate})`;
};

function updateTaskQuery(TaskInfo, user_id) {
  return `UPDATE User_Tasks SET task_name=${TaskInfo.taskName}, description=${TaskInfo.taskDescription}, importance=${TaskInfo.taskImportance}, urgency=${TaskInfo.taskUrgency}, duedate=${TaskInfo.taskDuedate} WHERE owner_id=${user_id} AND task_id=${TaskInfo.taskID}`;
};

function createGroupQuery(GroupInfo, user_id) {
  return `INSERT INTO Groups (name, description, owner_id) VALUES (${GroupInfo.groupName}, ${GroupInfo.groupDescription}, ${user_id})`;
};

