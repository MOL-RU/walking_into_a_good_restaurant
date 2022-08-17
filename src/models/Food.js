import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

const Food = mongoose.model("Food", foodSchema);
export default Food;
