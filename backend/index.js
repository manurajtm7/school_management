import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import { configDotenv } from "dotenv";
import { connect_to_db } from "./controllers/database/connect_db.mjs";

import UsersRoute from "./routes/users/route.mjs";
import StudentRoute from "./routes/students/route.mjs";
import FeesRoute from "./routes/fees/route.mjs";
import LibraryRoute from "./routes/library/route.mjs";
import AuthRoute from "./routes/auth/route.mjs";

// middleware and config methods
configDotenv();
const app = express();
// middleware and config methods ends

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
connect_to_db();
// middlewares end

// routes
app.use("/", AuthRoute);
app.use("/", UsersRoute);
app.use("/", StudentRoute);
app.use("/", FeesRoute);
app.use("/", LibraryRoute);
// routes ends

app.get("/", (req, res) => {
  res.json("ping!");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log("server connected on port " + PORT);
});
