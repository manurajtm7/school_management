import mongoose from "mongoose";
import Library_model from "../../schemas/library/library_schema.mjs";

// Create a new book entry
export const createLibraryEntry = async (req, res) => {
  try {
    const libraryEntry = new Library_model(req.body);
    await libraryEntry.save();
    res.status(201).json(libraryEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all library entries
export const getAllLibraryEntries = async (req, res) => {
  try {
    const libraryEntries = await Library_model.find().populate(
      "receipient_det"
    );
    res.status(200).json(libraryEntries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single library entry by ID
export const getLibraryEntryById = async (req, res) => {
  try {
    const libraryEntry = await Library_model.findById(
      new mongoose.Types.ObjectId(req.params.id.split(":")[1])
    ).populate("receipient_det");
    if (!libraryEntry)
      return res.status(404).json({ message: "Library entry not found" });
    res.status(200).json(libraryEntry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a library entry
export const updateLibraryEntry = async (req, res) => {
  try {
    const updatedLibraryEntry = await Library_model.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params.id.split(":")[1]),
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLibraryEntry)
      return res.status(404).json({ message: "Library entry not found" });
    res.status(200).json(updatedLibraryEntry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a library entry
export const deleteLibraryEntry = async (req, res) => {
  try {
    const libraryEntry = await Library_model.findByIdAndDelete(
      new mongoose.Types.ObjectId(req.params.id.split(":")[1])
    );
    if (!libraryEntry)
      return res.status(404).json({ message: "Library entry not found" });
    res.status(200).json({ message: "Library entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
