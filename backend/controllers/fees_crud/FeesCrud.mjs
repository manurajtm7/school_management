import Fees_model from "../../schemas/fees/fees_schema.mjs";

// Create a new fee entry
export const createFees = async (req, res) => {
  try {
    const fees = new Fees_model(req.body);
    await fees.save();
    res.status(201).json(fees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all fees records
export const getAllFees = async (req, res) => {
  try {
    const fees = await Fees_model.find().populate("student_id");
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single fee record by ID
export const getFeesById = async (req, res) => {
  try {
    const fees = await Fees_model.findById(req.params.id).populate("student_id");
    if (!fees) return res.status(404).json({ message: "Fees not found" });
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a fee record
export const updateFees = async (req, res) => {
  try {
    const updatedFees = await Fees_model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFees) return res.status(404).json({ message: "Fees not found" });
    res.status(200).json(updatedFees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a fee record
export const deleteFees = async (req, res) => {
  try {
    const fees = await Fees_model.findByIdAndDelete(req.params.id);
    if (!fees) return res.status(404).json({ message: "Fees not found" });
    res.status(200).json({ message: "Fees deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
