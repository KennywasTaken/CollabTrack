
// General Module Imports
import express from 'express';
import dotenv from 'dotenv';
import bodyparser from 'body-parser';

// Router Imports
import ROUTES_account from './routes/account.mjs'
import ROUTES_login from './routes/login.mjs'
import ROUTES_dashboard from './routes/dashboard.mjs'
import ROUTES_tasks from './routes/tasks.mjs'

import bodyParser from 'body-parser';

// App Creation
const app = express();

// Set up dotenv
dotenv.config({path: './.env'});

// Enable express json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set HTML render engine
app.set("view engine", "ejs")

// Set up static html pages (Non-changing pages with pure html and no JS)
app.use(express.static("./public"))

app.get('/', (req, res) => {

  // Render the website's homepage
  res.render('index.ejs')

});

// Connect routers
app.use('/account', ROUTES_account)
app.use('/login', ROUTES_login)
app.use('/dashboard', ROUTES_dashboard)
app.use('/tasks', ROUTES_tasks)

// Start Server
// The '0.0.0.0' opens IP connections wider to not just localhosts once port has been forwarded
app.listen(process.env.PORT, ("0.0.0.0"), () => {
  console.log(`Server is up and listening on port:  ${process.env.PORT}`)
}); 

