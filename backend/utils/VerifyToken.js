const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next(errorHandler(401, "access Denied,no token found"));
  }
  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    console.log("Cookies received:", req.cookies);

    next();
  } catch (error) {
    return next(error.message);
  }
};

module.exports = verifyToken;
