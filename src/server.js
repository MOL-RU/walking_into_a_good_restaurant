import express from "express";
import indexRouter from "./routers/indexRouter.js";
import foodRouter from "./routers/foodRouter.js";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import path from "path";
const __dirname = path.resolve();

const app = express();

app.set("view engine", "html");
nunjucks.configure(process.cwd() + "/src/views", {
  express: app,
  watch: true,
});

app.use(express.static("src"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/food", foodRouter);

export default app;
