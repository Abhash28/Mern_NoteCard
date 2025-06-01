const express = require("express");
const {
  signup,
  login,
  signout,
  profile,
} = require("../controller/authController");
const verifyToken = require("../utils/VerifyToken");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/signout", verifyToken, signout);
router.get("/profile", verifyToken, profile);

module.exports = router;
