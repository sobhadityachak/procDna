const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../controllers/auth.controller.js");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Get current user
router.get("/user", getCurrentUser);

module.exports = router;
