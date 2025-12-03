
import express from 'express';

const router = express.Router();

// '/dashboard' Routes
//router.get("/", (req, res) => {

//  res.status(200).send("Hello");

//});

// Dynamic Routes
router.get("/dashboard/:userEmail", (req, res) => {
  console.log("Reqeust /dashabord recieved:");
  console.log(req.params);

  res.status(200).send("e");
});

export default router;

