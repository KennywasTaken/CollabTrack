
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


async function getUserInfoWithEmail(ID) {
 let resp = DB.run(userInfoWithEmailQuery(ID), [], (err) => {
   if (err) {
     console.log("Error running 'getUserInfoWithEmail' SQL Query");
     return null;
   }

   console.log(resp);

   //return resp;
   return null;
 });
}

async function createTask(FormInfo) {
  console.log("Creating Task....")
  console.log(FormInfo);

  let resp = DB.run(createTaskQuery(FormInfo, FormInfo.user_id), [], (err) => {
    if (err) {
     console.log("Error running 'createTask' SQL Query");
     return null;
   }

   console.log(resp);

   //return resp;
   return null;
  });
}

async function updateTask(FormInfo) {
  console.log("Updating Task....");
  console.log(FormInfo);

  let resp = DB.run(updateTaskQuery(FormInfo, FormInfo.user_id), [], (err) => {
    if (err) {
     console.log("Error running 'updateTask' SQL Query");
     return null;
   }

   console.log(resp);

   //return resp;
   return null;
  });
}

export { DB, getUserInfoWithEmail, createTask, updateTask };



function userInfoWithEmailQuery(user_id) { 
  return `SELECT user_id FROM Users WHERE email=${user_id}`;
};

function createTaskQuery(TaskInfo, user_id) {
  return `INSERT INTO User_Tasks (owner_id, task_name, description, importance, urgency, due_date) VALUES (${user_id}, ${TaskInfo.taskName}), ${TaskInfo.taskDescription}, ${taskImportance}, ${taskUrgency}, ${taskDuedate}, ${taskDuedate}`;
};

function updateTaskQuery(TaskInfo, user_id) {
  return `UPDATE User_Tasks SET task_name=${TaskInfo.taskName}, description=${TaskInfo.taskDescription}, importance=${TaskInfo.taskImportance}, urgency=${TaskInfo.taskUrgency}, duedate=${TaskInfo.taskDuedate} WHERE owner_id=${user_id} AND task_id=${TaskInfo.taskID}`;
};


