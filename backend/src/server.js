import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import logger from "morgan";

import routes from "./routes";

export const app = express();

require("dotenv").config();

app.use(cors());

const API_PORT = process.env.API_PORT;
const dbRoute = process.env.DB_ROUTE;

mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(routes);
app.use("/api", routes);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
