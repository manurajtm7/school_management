import { Schema, model } from "mongoose";

const user_schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 5 },
    role: {
      type: String,
      enum: ["admin", "office", "library"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User_model = model("users", user_schema);

export default User_model;
