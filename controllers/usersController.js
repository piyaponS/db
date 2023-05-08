const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenKey = process.env.JWT_KEY;

const registerUser = async (req, res) => {
  const generateToken = (id) => {
    return jwt.sign({ id }, tokenKey, { expiresIn: "3h" });
  };

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      message: "Please add all fields",
    });
  }

  //User exists
  const userEx = await User.findOne({ email });
  if (userEx) {
    res.status(400).json({
      message: "User already exists",
    });
  }

  //Encrypted password
  const encryptedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
    });
  }
  //       //  _id: user.id,
  //       //  name: user.name,
  //       //  email: user.email,
  //       //  token: generateToken(user._id),

  if (!user) {
    res.status(400).json({ message: "Invalid user data!" });
  }
};

const loginUser = async (req, res) => {
  const generateToken = (id) => {
    return jwt.sign({ id }, tokenKey, { expiresIn: "3h" });
  };
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (user && isValidPassword) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials",
    });
  }
};

const getData = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { registerUser, loginUser, getData };
