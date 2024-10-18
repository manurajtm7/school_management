import mongoose, { Schema, model } from "mongoose";

const student_schema = new Schema(
  {
    name: { type: String, required: true },
    roll_no: { type: Number, required: true, unique: true },
    class_of: { type: String, required: true },
    fees_det: [{ type: mongoose.Schema.ObjectId, ref: "fees" }],
    library_det: [{ type: mongoose.Schema.ObjectId, ref: "library" }],
  },
  {
    timestamps: true,
  }
);

const Student_model = model("students", student_schema);

export default Student_model;
