const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();
router.post("/register", async (req, res) => {
  let model = req.body;
  if (model.name && model.email && model.password) {
    // register
    await registerUser(model);
    res.send({
      message: "User Registered",
    });
  } else {
    res.status(400).json({
      error: "Please provide name , email and password",
    });
  }
});
router.post("/login", async (req, res) => {
  let model = req.body;
  if (model.email && model.password) {
    // register
    const result = await loginUser(model);
    if (result) {
      res.send({
        result,
        message: "Login Successful",
      });
    } else {
      res.status(400).json({
        error: "Invalid Credentials",
      });
    }
  } else {
    res.status(400).json({
      error: "Please Provide email and password",
    });
  }
});

module.exports = router;
