import Food from "../models/Food.js";

export const main = async (req, res) => {
  try {
    const foods = await Food.find({});
    console.log(foods);
    return res.render("main", { foods });
  } catch (error) {
    return res.render("/", error);
  }
};

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  console.log(title, description, hashtags);
  const food = new Food({
    title,
    description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map((word) => `#${word}`),
    meta: {
      views: 0,
      rating: 0,
    },
  });
  const dbFood = await food.save();
  console.log(dbFood);
  return res.redirect("/main");
};
