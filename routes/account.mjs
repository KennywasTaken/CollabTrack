
import express from 'express';

const router = express.Router();

// '/account' Routes
router.get("/", (req, res) => {

  res.status(200).render("history.ejs");

});

// Dynamic Routes
//router.get("/change/:name", (req, res) => {
//  res.send(`Hello ${req.params.name}!`);
//});

export default router;

