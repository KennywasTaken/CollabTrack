
import {render} from 'ejs';
import express from 'express';

const router = express.Router();

// '/dashboard' Routes
router.get("/", (req, res) => {
  console.log("Reqeust /dashabord recieved:");

  res.status(200).render('login.ejs');

});

// Dynamic Routes
router.get("/:userID", (req, res) => {
  console.log("Reqeust /dashabord/:userID recieved:");
  //console.log(req.params);

  res.status(200).render('index.ejs', { PORT: process.env.PORT });
});

export default router;

