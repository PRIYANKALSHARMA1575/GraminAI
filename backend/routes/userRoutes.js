const express=require("express");
const database=require("../connect.js");
const ObjectId = require("mongodb").ObjectId;
const userRoutes=express.Router();


userRoutes.get("/users", async (req, res) => {
  try {
    const db = database.getDb();
    const users = await db.collection("users").find({}).toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});


userRoutes.get("/users/:Email", async (req, res) => {
  const userId = req.params.id;
  try {
    const db = database.getDb();
    const user = await db.collection("users").findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

userRoutes.post("/users", async (req, res) => {
  const newUser = {
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Contact: req.body.Contact,
    Age: req.body.Age,
  };

  // Basic validation
  if (!newUser.Name || !newUser.Email || !newUser.Password || !newUser.Contact || !newUser.Age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (newUser.Email.length < 5 || !newUser.Email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (newUser.Password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  if (isNaN(newUser.Contact) || newUser.Contact.length !== 10) {
    return res.status(400).json({ message: "Contact must be a 10-digit number" });
  }

  if (isNaN(newUser.Age) || newUser.Age < 0 || newUser.Age > 120) {
    return res.status(400).json({ message: "Age must be a valid number between 0 and 120" });
  }

  try {
    const db = database.getDb();

    // ✅ Check for existing email
    const existingUser = await db.collection("users").findOne({ Email: newUser.Email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists. Please login instead." });
    }

    // ✅ Insert new user
    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json({ message: "User created successfully", userId: result.insertedId });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
});


userRoutes.put("/users/:Email", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = {
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    Contact: req.body.Contact,
    Age: req.body.Age,
  };

  // Basic validation
  if (!updatedUser.Name || !updatedUser.Email || !updatedUser.Password || !updatedUser.Contact || !updatedUser.Age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (updatedUser.Email.length < 5 || !updatedUser.Email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (updatedUser.Password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  if (isNaN(updatedUser.Contact) || updatedUser.Contact.length !== 10) {
    return res.status(400).json({ message: "Contact must be a 10-digit number" });
  }

  if (isNaN(updatedUser.Age) || updatedUser.Age < 0 || updatedUser.Age > 120) {
    return res.status(400).json({ message: "Age must be a valid number between 0 and 120" });
  }

  try {
    const db = database.getDb();
    const result = await db.collection("users").updateOne(
      { _id: ObjectId(userId) },
      { $set: updatedUser }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or no changes made" });
    }

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error });
  }
});
userRoutes.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const db = database.getDb();
    const result = await db.collection("users").deleteOne({ _id: ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error });
  }
});
userRoutes.delete("/users", async (req, res) => {
  try {
    const db = database.getDb();
    const result = await db.collection("users").deleteMany({});
    res.status(200).json({ message: `${result.deletedCount} users deleted successfully` });
  } catch (error) {
    console.error("Error deleting all users:", error);
    res.status(500).json({ message: "Error deleting all users", error });
  }
});


// REGISTER endpoint
userRoutes.post("/register", async (req, res) => {
  const { Name, Email, Password, Contact, Age } = req.body;

  if (!Name || !Email || !Password || !Contact || !Age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = database.getDb();
    const existing = await db.collection("users").findOne({ Email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    await db.collection("users").insertOne({ Name, Email, Password, Contact, Age });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN endpoint
userRoutes.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    const db = database.getDb();
    const user = await db.collection("users").findOne({ Email, Password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



userRoutes.get("/profile/:email", async (req, res) => {
  try {
    const email = req.params.email;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const db = database.getDb();
    const user = await db.collection("users").findOne({ Email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      Name: user.Name,
      Email: user.Email
    });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = userRoutes;
