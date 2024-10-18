import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();
const connection_string = process.env.MONGODB_CONNECT_STR;


function connect_to_db() {
  
  mongoose
    .connect(connection_string)
    .then(() => console.log("mongoose connected!"))
    .catch((err) => console.log(err));
}

export { connect_to_db };
