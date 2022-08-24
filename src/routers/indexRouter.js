import express from "express";
import { main } from "../controllers/foodController.js";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  return res.render("index");
});

indexRouter.route("/login").get(getLogin).post(postLogin);

indexRouter.get("/main", main);

indexRouter.route("/join").get(getJoin).post(postJoin);

indexRouter.get("/a", (req, res) => {
  return res.render("a");
});

export default indexRouter;
