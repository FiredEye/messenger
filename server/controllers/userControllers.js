const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const usernameCheck = await User.findOne({ fullname });

    if (usernameCheck)
      return res.json({
        msg: "Username already used",
        status: false,
      });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      fullname,
      password: hashedPassword,
    });

    const { password: uPass, ...sanitizedUser } = user._doc;
    return res.json({
      status: true,
      msg: "User registered Sucessfully!",
      user: sanitizedUser,
    });
  } catch (err) {
    res.status(401).json({ msg: "Something went wrong" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailCheck = await User.findOne({ email });
    if (!emailCheck)
      return res.json({ msg: "Email not registered!", status: false });
    const checkPass = bcrypt.compareSync(password, emailCheck.password);
    if (!checkPass)
      return res.json({ msg: "Invalid Credentials!", status: false });

    const { password: uPass, ...sanitizedUser } = emailCheck._doc;
    return res.json({
      status: true,
      msg: "User loggedIn Sucessfully!",
      user: sanitizedUser,
    });
  } catch (err) {
    res.status(401).json({ msg: "Something went wrong" });
  }
};

const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    return res.json({
      status: true,
      msg: "User Image added Sucessfully!",
    });
  } catch (ex) {
    res.status(401).json({ msg: "Something went wrong" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "fullname",
      "avatarImage",
      "_id",
    ]);
    const onUsers = users.map((user) => {
      return {
        email: user.email,
        fullname: user.fullname,
        avatarImage: user.avatarImage,
        _id: user._id,
        isActive: onlineUsers.has(user._id.toString()),
      };
    });
    console.log(onlineUsers);
    return res.json(onUsers);
  } catch (err) {
    res.status(401).json({ msg: "Something went wrong" });
  }
};

const logOut = (req, res) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    res.status(401).json({ msg: "Something went wrong" });
  }
};

module.exports = { register, login, setAvatar, getAllUsers, logOut };
