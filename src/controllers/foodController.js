import Food from "../models/Food.js";

export const main = async (req, res) => {
  const foods = await Food.find({}).sort({ createdAt: "desc" });
  return res.render("main", { foods });
};

export const getUpload = (req, res) => {
  return res.render("upload");
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags, category } = req.body;
  const foodImg = req.file;
  try {
    await Food.create({
      title,
      description,
      hashtags: Food.formatHashtags(hashtags),
      foodUrl: foodImg.path,
      category,
    });
    return res.redirect("/main");
  } catch (error) {
    console.log(error);
    return res.status(400).render("upload");
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
    return res.status(404).render("main");
  }
  return res.render("edit", { food });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags, category } = req.body;
  const food = await Food.exists({ _id: id });

  await Food.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Food.formatHashtags(hashtags),
    category,
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

export const categorySort = async (req, res) => {
  const { category } = req.query;
  let foods = [];
  if (category) {
    foods = await Food.find({
      category: {
        $regex: new RegExp(`${category}`, "i"),
      },
    });
  }
  return res.render("search", { foods });
};

export const recommend = async (req, res) => {
  let recoFood = await Food.aggregate([{ $sample: { size: 1 } }]);
  recoFood = recoFood[0];
  return res.render("recommend", { recoFood });
};
