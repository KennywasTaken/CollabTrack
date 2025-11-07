
// General Module Imports
import express from 'express';
import dotenv from 'dotenv';

// Router Imports
import ROUTES_account from './routes/account.mjs'

// App Creation
const app = express();

// Set up dotenv
dotenv.config({path: './.env'})

// Enable express json
app.use(express.json());

// Set HTML render engine
app.set("view engine", "ejs")

// Set up static html pages (Non-changing pages with pure html and no JS)
app.use(express.static("./public"))

app.get('/', (req, res) => {

  // Render the website's homepage
  res.render('home.ejs')

});

// Connect routers
app.use('/account', ROUTES_history)

// Start Server
// The '0.0.0.0' opens IP connections wider to not just localhosts
app.listen(process.env.PORT, ("0.0.0.0"), () => {
  console.log(`Server is up and listening on port:  ${process.env.PORT}`)
}); 

