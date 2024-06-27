import express from "express";
import path from "node:path";
import logger from "morgan";

import indexRouter from "./routes/index";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
