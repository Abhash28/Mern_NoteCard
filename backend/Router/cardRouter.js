const express = require("express");
const {
  addCard,
  updateCard,
  deleteCard,
  fetchAll,
} = require("../controller/cardController");
const verifyToken = require("../utils/VerifyToken");
const router = express.Router();

router.get("/fetchAll", fetchAll);
router.post("/add", verifyToken, addCard);
router.put("/update/:cardId", verifyToken, updateCard);
router.delete("/delete/:cardId", verifyToken, deleteCard);

module.exports = router;
