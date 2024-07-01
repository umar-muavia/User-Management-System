const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

/// Models
let UserModel = require("./models/User");
let AddUserModel = require("./models/AddUser");

const SECRET_KEY = "your-secret-key";

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cookieParser());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/User-App")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

/// Register Api
app.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      name,
      username,
      email,
      password: hash,
    });
    res.json({ status: "OK", user });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

//// Loin Api
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: "error", message: "User Not Found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid email or password" });
    }

    /// generate new token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      SECRET_KEY,
      { expiresIn: "40m" }
    );
    console.log("generate-token", token);
    const decodeToken = jwt.decode(token);
    res.json({
      status: "OK",
      token: token,
      decodeToken,
      username: user.username,
    });
  } catch (err) {
    res.json(err);
  }
});

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  // console.log("authenticateJWT", token);
  if (!token) {
    return res.status(401).json({ status: "error", message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ status: "error", message: "Invalid token" });
  }
};

// Protected route example
app.get("/protected", authenticateJWT, (req, res) => {
  res.json({
    status: "OK",
    message: "You have access to this protected route",
  });
});

/// AddUser Api
app.post("/users", authenticateJWT, async (req, res) => {
  const { name, email, age, city } = req.body;
  try {
    // Check if the email already exists
    const existingUser = await AddUserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    // Create a new user
    const newUser = new AddUserModel({
      name,
      email,
      age,
      city,
      userId: req.user.userId, // Get userId from the token
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    // Duplicate key error
    if (error.code === 11000) {
      res
        .status(401)
        .json({ status: "error", message: "Email already exists" });
    } else {
      // Other errors
      res.status(400).json({ status: "error", message: error.message });
    }
  }
});

/// get users
app.get("/users", authenticateJWT, async (req, res) => {
  try {
    const users = await AddUserModel.find({ userId: req.user.userId });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/// delete user
app.delete("/users/:id", authenticateJWT, async (req, res) => {
  try {
    let user = await AddUserModel.findByIdAndDelete(req.params.id);
    console.log("delete-user", user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

/// update user
app.put("/users/:id", authenticateJWT, async (req, res) => {
  try {
    const updatedUser = await AddUserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("updated-user" , updatedUser);
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

// get update user
app.get("/users/:id", authenticateJWT, async (req, res) => {
  try {
    const user = await AddUserModel.findById(req.params.id);
    console.log("get for update user" , user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});
