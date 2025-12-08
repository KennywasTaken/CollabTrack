
const PORT = 6767;

// Adding events for settings the important variables
window.addEventListener("load", setDashboardUIElementData)

// Endpoint
// (If this were a serious product we would have this endpoint be a proxy that the server is connected to for security purposes)
const Endpoint_tasks= `http://localhost:${PORT}/api/tasks/${window.location.pathname.split('/')[2]}`;
const Endpoint_groups= `http://localhost:${PORT}/api/groups/${window.location.pathname.split('/')[2]}`;
const Endpoint_users= `http://localhost:${PORT}/api/users/${window.location.pathname.split('/')[2]}`;


// Getting list and task card elements
const upcomingUserTasksList = document.getElementById("upcomingTasksContent");
const upcomingUserTaskSmallCard = document.getElementById("upcomingTask");

// Getting user groups card element
const userGroupsList = document.getElementById("userGroupsList");
const userGroupsListCard = document.getElementById("userGroupCard");

// Getting user info ard element
const userAccountInfoCard = document.getElementById("accountInfoCard")

// Getting modal elements
const newTaskButton = document.getElementById("createTaskButtonc");
const newTaskModalForm = document.getElementById("createTaskModal");



async function setDashboardUIElementData() {
  let userInfo = await getUserAccountData();
  let userUpcomingTasks = await getUserTasksData();
  let userGroups = await getUserGroupsData();

  // Populate the tasks list
  if (userUpcomingTasks.foundData === 1) {
    console.log("Adding tasks...")
    userUpcomingTasks.Data.forEach(task => addTaskToTaskList(task))
  }
  // No task data was found to populate the list
  else {
  }


  // Populate the groups list
  if (userGroups.foundData === 1) {
    console.log("Adding groups...")
    userGroups.Data.forEach(group => addGroupToGroupList(group))
  }
  // No group data was found to populate the list
  else {

  }

  // Populate the account info card
  if (userInfo.foundData === 1) {
    console.log("Setting account info...")
    console.log(userInfo);

    // Set card element data
    //document.getElementById("accountCardAvatar")
    document.getElementById("accountCardNameLabel").innerHTML = `${userInfo.Data[0].legal_first} ${userInfo.Data[0].legal_last}`;
    document.getElementById("accountCardEmailLabel").innerHTML = `${userInfo.Data[0].email}`;
    document.getElementById("accountCardAboutMeLabel").innerHTML = `${userInfo.Data[0].about_me}`;
  }
  // No group data was found to populate the list
  else {

  }
}

async function getUserAccountData() {
 // Query server endpoint
  let dataRes = await fetch(Endpoint_users, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  }).then(res => {return res.json()})

  return dataRes;
}

async function getUserTasksData() {
  // Query server endpoint
  let dataRes = await fetch(Endpoint_tasks, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  }).then(res => {return res.json()})

  return dataRes;
}

async function getUserGroupsData() {
  // Query server endpoint
  let dataRes = await fetch(Endpoint_groups, {
    method: "GET",
    headers: {"Content-Type": "application/json"},
  }).then(res => {return res.json()})

  return dataRes;
}

async function updateTaskData() {
 // Query server endpoint
  let dataRes = await fetch(Endpoint_tasks, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      type: 'update',
    })
  }).then(res => {return res.json()})

  return dataRes;
}


function addTaskToTaskList(taskInfo) {
  console.log(taskInfo)

  // Var to hold copy of Task Card element
  let taskCardCopy = upcomingUserTaskSmallCard.cloneNode(true);

  // Edit cloned element to reflect task data
  taskCardCopy.classList.remove("d-none")
  
  taskCardCopy

  // Appending card Task List element
  upcomingUserTasksList.appendChild(taskCardCopy);
}

function addGroupToGroupList(groupInfo) {
  console.log(groupInfo)

  let groupInfoCardCopy = userGroupsListCard.cloneNode(true);

  groupInfoCardCopy.classList.remove("d-none");

  userGroupsList.appendChild(groupInfoCardCopy);
}
