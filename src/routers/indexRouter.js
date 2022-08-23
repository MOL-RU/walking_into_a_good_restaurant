import express from "express";
import { main } from "../controllers/foodController.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  return res.render("index");
});

indexRouter.get("/login", (req, res) => {
  return res.render("login");
});

indexRouter.get("/join", (req, res) => {
  return res.render("join");
});

indexRouter.get("/main", main);

indexRouter.get("/a", (req, res) => {
  return res.render("a");
});

export default indexRouter;
