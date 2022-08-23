import Food from "../models/Food.js";

export const main = async (req, res) => {
  const foods = await Food.find({}).sort({ createdAt: "desc" });
  return res.render("main", { foods });
};

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const foodImg = req.file;
  console.log(foodImg);
  try {
    await Food.create({
      title,
      description,
      hashtags: Food.formatHashtags(hashtags),
      foodUrl: foodImg.path,
    });
    return res.redirect("/main");
  } catch (error) {
    console.log(error);
    return res.render("upload");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const food = await Food.findById(id);
  if (!food) {
    return res.render("main");
  }
  return res.render("watch", { food });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const food = await Food.findById(id);
  if (!food) {
    return res.render("main");
  }
  return res.render("edit", { food });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const food = await Food.exists({ _id: id });

  await Food.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Food.formatHashtags(hashtags),
  });

  return res.redirect(`/food/${id}`);
};

export const delteFood = async (req, res) => {
  const { id } = req.params;
  await Food.findByIdAndDelete(id);
  return res.redirect("/main");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let foods = [];
  if (keyword) {
    foods = await Food.find({
      title: {
        $regex: new RegExp(`${keyword}`, "i"),
      },
    });
  }

  return res.render("search", { foods });
};
