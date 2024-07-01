// controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");
const { check } = require("express-validator");
const sendMail = require("../utils/mailer"); // Import the sendMail function

// Validation middleware for register route
exports.validateRegister = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("username", "Username is required").not().isEmpty(),
  check("username", "Username must be unique").custom(async (value) => {
    const user = await User.findOne({ username: value });
    if (user) {
      throw new Error("Username already in use");
    }
  }),
  check("email", "Please include a valid email").isEmail(),
  check("email", "Email must be unique").custom(async (value) => {
    const user = await User.findOne({ email: value });
    if (user) {
      throw new Error("Email already in use");
    }
  }),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
];

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, username, email, password, role } = req.body;

  try {
    // Check if user with same email exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with firstName, lastName, username, email, role, and status
    user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: role || "USER", // Default to USER role if not specified
      status: role === "USER" ? "pending" : undefined,
    });

    await user.save();

    // Send email if role is USER
    if (role === "USER" || !role) {
      const subject = "Registration Successful";
      const text = `Hello ${firstName},\n\nThank you for registering. Your account is currently pending approval. We will notify you once it has been reviewed.\n\nBest regards,\nYour Team`;

      await sendMail(email, subject, text);
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Validation middleware for login route
exports.validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
];

// Login user
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Check user status
    if (user.status === "pending" || user.status === "rejected") {
      return res
        .status(400)
        .json({
          errors: [{ msg: "Account not approved. Please contact support." }],
        });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
