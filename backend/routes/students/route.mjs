import { Router } from "express";
import Student from "../../schemas/students/student_schema.mjs";
import mongoose from "mongoose";

const router = Router();
// CREATE - Add a new student
router.post("/student/create", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ - Get all students
router.get("/student/view", async (req, res) => {
  try {
    const students = await Student.find()
      .populate("fees_det")
      .populate("library_det");
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ - Get a single student by ID
router.get("/student/view/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("fees_det")
      .populate("library_det");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE - Update a student by ID
router.put("/student/update/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE - Delete a student by ID
router.delete("/student/delete/:id", async (req, res) => {
  console.log(req.params.id);
  
  try {
    const student = await Student.findByIdAndDelete(new mongoose.Types.ObjectId(req.params.id.split(":")[1]));
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
