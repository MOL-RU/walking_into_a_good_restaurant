import express from "express";
import {
  getEdit,
  getUpload,
  postUpload,
  postEdit,
  delteFood,
  watch,
  search,
  categorySort,
  recommend,
} from "../controllers/foodController.js";
import { uploadFiles } from "../middlewares.js";

const foodRouter = express.Router();

foodRouter.get("/categories", (req, res) => {
  return res.render("categories");
});

foodRouter.get("/map", (req, res) => {
  return res.render("map");
});

foodRouter.get("/:id([0-9a-f]{24})", watch);

foodRouter
  .route("/upload")
  .get(getUpload)
  .post(uploadFiles.single("foodpic"), postUpload);
foodRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(getEdit)
  .post(uploadFiles.single("foodpic"), postEdit);
foodRouter.route("/:id([0-9a-f]{24})/delete").get(delteFood);

foodRouter.get("/search", categorySort);
foodRouter.get("/recommend", recommend);

export default foodRouter;
