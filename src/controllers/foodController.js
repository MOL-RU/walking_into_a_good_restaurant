import Food from "../models/Food.js";

export const main = async (req, res) => {
  const foods = await Food.find({});
  console.log(foods);
  return res.render("main", { foods });
};

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Food.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/main");
  } catch (error) {
    console.log(error);
    return res.render("upload");
  }
};
