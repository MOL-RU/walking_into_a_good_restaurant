import express from "express";
import {
  getEdit,
  getUpload,
  postUpload,
  postEdit,
  delteFood,
  watch,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

foodRouter.get("/categories", (req, res) => {
  return res.render("categories");
});

foodRouter.get("/map", (req, res) => {
  return res.render("map");
});

foodRouter.get("/recommend", (req, res) => {
  return res.render("recommend");
});

foodRouter.get("/:id([0-9a-f]{24})", watch);

foodRouter.route("/upload").get(getUpload).post(postUpload);
foodRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
foodRouter.route("/:id([0-9a-f]{24})/delete").get(delteFood);

export default foodRouter;
