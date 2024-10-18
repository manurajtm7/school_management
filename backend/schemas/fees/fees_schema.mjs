import mongoose, { Schema, model } from "mongoose";

const fees_schema = new Schema(
  {
    student_id: {
      type: mongoose.Schema.ObjectId,
      ref: "students",
      required: true,
    },
    total_amout: { type: Number, required: true },
    paid_amout: { type: Number, required: true },
    has_balance: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
  }
);

const Fees_model = model("fees", fees_schema);

export default Fees_model;
