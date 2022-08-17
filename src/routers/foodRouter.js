import express from "express";
import { getUpload, postUpload } from "../controllers/foodController.js";

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

foodRouter.route("/upload").get(getUpload).post(postUpload);

export default foodRouter;
