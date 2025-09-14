const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.logIn(user, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      try {
        await User.findByIdAndUpdate(user._id, { lastLogin: new Date() });
      } catch (updateErr) {
        console.error("Error updating last login:", updateErr);
      }

      return res.json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          lastLogin: new Date(),
        },
      });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }
    res.json({ message: "Logout successful" });
  });
};

const getCurrentUser = async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const ClinicalTrial = require("../models/ClinicalTrial");
      const trialCount = await ClinicalTrial.countDocuments({
        createdBy: req.user._id,
      });

      res.json({
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          createdAt: req.user.createdAt,
          lastLogin: req.user.lastLogin,
          trialCount: trialCount,
        },
      });
    } catch (error) {
      res.json({
        user: {
          id: req.user._id,
          username: req.user.username,
          email: req.user.email,
          createdAt: req.user.createdAt,
          lastLogin: req.user.lastLogin,
          trialCount: 0,
        },
      });
    }
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
};
