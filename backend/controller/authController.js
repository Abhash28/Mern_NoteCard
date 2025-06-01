const errorHandler = require("../utils/error");
const AuthDb = require("../model/authSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//post signup data
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  //if name and email and password not available
  if (!name || !email || !password) {
    return next(errorHandler(400, "All field required"));
  }
  //convert hased password
  const hasedPass = await bcrypt.hash(password, 10);
  console.log(hasedPass);
  //push on db
  try {
    const response = await AuthDb.create({
      name: name,
      email: email,
      password: hasedPass,
    });
    console.log("Data add in Db successfull", response);
    res
      .status(201)
      .json({ success: true, message: "Signup successfully", response });
  } catch (error) {
    next(error);
  }
};

// for login
const login = async (req, res, next) => {
  const { email, password } = req.body;
  //if email and password not available
  if (!email || !password) {
    return next(errorHandler(401, "All field required"));
  }
  //email vaildation
  const vaildEmail = await AuthDb.findOne({ email });
  if (!vaildEmail) {
    return next(errorHandler(401, "Invaild email"));
  }
  //compare password
  const comPass = await bcrypt.compare(password, vaildEmail.password);
  if (!comPass) {
    return next(errorHandler(401, "invaild Password"));
  }
  try {
    const response = await AuthDb.findById(vaildEmail._id);

    // genrate jwt
    const token = jwt.sign(
      { id: vaildEmail._id, name: vaildEmail.name },
      process.env.SECRET_KEY
    );
    // send cookies
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      success: true,
      message: "Login successfull",
      response,
    });
  } catch (error) {
    next(error);
  }
};

//signout
const signout = async (req, res, next) => {
  try {
    console.log(req.user);
    res.clearCookie("accessToken");
    res.status(201).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    next(error);
  }
};

// profile
const profile = (req, res, next) => {
  try {
    res.status(200).json({ success: true, user: { name: req.user.name } });
  } catch (error) {
    next(error);
  }
};
module.exports = { signup, login, signout, profile };
