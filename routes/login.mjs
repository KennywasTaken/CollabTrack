
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

  function queryCallback(userInfoResult) {
    if (userInfoResult.length > 0) {
     // Redirect to account dashboard page with user ID
      res.status(200).redirect(`https://localhost:${process.env.PORT}/dashboard/${userInfoResult.user_id}`);
    }
    else {
     // Redirect back to login page due to failed login
      res.status(400).redirect(`https://localhost:${process.env.PORT}/login`);
    }
  }

  getUserInfoWithEmail(req.body.userEmail, );
});


// Dynamic Routes
//router.get("/change/:name", (req, res) => {
//  res.send(`Hello ${req.params.name}!`);
//});

export default router;

