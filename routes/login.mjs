
import express from 'express';
import { getUserInfoWithEmail } from '../resources/sqlTools.mjs';

const router = express.Router();

// '/login' Routes
router.get("/", (req, res) => {
  res.status(200).render("login.ejs");
});

router.post("/", (req, res) => {
  console.log("Login Request Recieved:");
  console.log(req.body)

  // Get user ID with email ID
  const userInfo = getUserInfoWithEmail(req.body.userEmail);

  console.log(userInfo);

  // Redirect to account dashboard page with user ID
  res.status(200).redirect(`/dashboard/${req.body.userEmail}`)
});


// Dynamic Routes
//router.get("/change/:name", (req, res) => {
//  res.send(`Hello ${req.params.name}!`);
//});

export default router;

