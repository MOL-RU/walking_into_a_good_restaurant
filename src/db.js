import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/walkingfoods");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error);
db.on("error", handleError); // 여러번 실행
db.once("open", handleOpen); // 한번 실행
