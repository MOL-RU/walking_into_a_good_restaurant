import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join");
export const postJoin = async (req, res) => {
  const { username, password, password2, check } = req.body;
  if (password !== password2) {
    return res.status(400).render("join", {
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }] });
  if (exists) {
    return res.status(400).render("join", {
      errorMessage: "This username/email is already taken.",
    });
  }
  console.log(check);
  if (check !== "기린") {
    return res.status(400).render("join", {
      errorMessage: "세종대생 인증 실패!",
    });
  }
  try {
    await User.create({
      username,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      errorMessage: error._message,
    });
  }
};
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");

export const getLogin = (req, res) => res.render("login");
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      errorMessage: "아이디가 존재하지 않습니다.",
    });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      errorMessage: "Wrong password",
    });
  }
  return res.redirect("/main");
};
