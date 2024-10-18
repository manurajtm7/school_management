import mongoose, { Schema, model } from "mongoose";

const library_schema = new Schema(
  {
    book_title: { type: String, required: true },
    book_id: { type: String, required: true },
    receipient_det: {
      type: mongoose.Schema.ObjectId,
      ref: "students",
      required: true,    },
    is_returned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Library_model = model("library", library_schema);

export default Library_model;
