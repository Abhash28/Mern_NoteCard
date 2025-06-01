const Card = require("../model/cardSchema");
const errorHandler = require("../utils/error");

const fetchAll = async (req, res, next) => {
  try {
    const fetchAllCard = await Card.find();
    res.status(201).json({
      success: true,
      message: "Fetching all cards from DataBase",
      fetchAllCard,
    });
  } catch (error) {
    next(error);
  }
};

const addCard = async (req, res, next) => {
  const { title, discription } = req.body;
  console.log(title, discription);
  if (!title || !discription) {
    return next(errorHandler(404, "Both fileld required"));
  }
  try {
    const AddData = await Card.create({ title, discription });
    res.status(201).json({
      success: true,
      message: "Data save successfully",
      card: AddData,
    });
  } catch (error) {
    next(error);
  }
};

const updateCard = async (req, res, next) => {
  const { cardId } = req.params;
  const { title, discription } = req.body;
  const vaildId = await Card.findById(cardId);
  console.log(vaildId.title);
  if (!vaildId) {
    return next(errorHandler(401, "Card Not found in database"));
  }
  try {
    const updateData = await Card.findByIdAndUpdate(
      cardId,
      { title, discription },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Card updated successfully",
      updateData,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  console.log(cardId);
  try {
    const deleteCard = await Card.findByIdAndDelete(cardId);
    res
      .status(201)
      .json({ success: true, message: "card delete successfully", deleteCard });
  } catch (error) {
    next(error);
  }
};
module.exports = { fetchAll, addCard, updateCard, deleteCard };
