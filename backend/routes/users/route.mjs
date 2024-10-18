import { Router } from "express";
import mongoose from "mongoose";

import User from "../../schemas/users/users_schema.mjs";
import { hashPassword } from "../../utils/crypt_pass/hashPassword.mjs";

const router = Router();

router.post("/users/create", async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const hashedPassword = await hashPassword(password);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    // Save to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * READ: Get all users
 */
router.get("/users/view", async (req, res) => {
  try {
    const users = await User.find().select({ password: 0 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * READ: Get a user by ID
 */
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select({ password: 0 });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * UPDATE: Update a user by ID
 */
router.put("/users/update/:id", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.id.split(":")[1]),
      { username, password, role },
      { new: true, runValidators: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * DELETE: Remove a user by ID
 */
router.delete("/users/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(
      new mongoose.Types.ObjectId(req.params.id.split(":")[1])
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
