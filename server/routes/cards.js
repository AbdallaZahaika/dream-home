const express = require("express");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const auth = require("../middleware/auth");
const {
  CardModel,
  validateCard,
  generateCardNumber,
  validateChangeUserInfo,
} = require("../models/card");

const router = express.Router();

//// get new sale cards
router.get("/new-sale-cards", async (req, res) => {
  try {
    const cards = await CardModel.find({ status: "sale" }, { __v: 0 })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(cards);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//// get new rent cards
router.get("/new-rent-cards", async (req, res) => {
  try {
    const cards = await CardModel.find({ status: "rent" }, { __v: 0 })
      .sort({ createdAt: -1 })
      .limit(3);
    res.json(cards);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

/// search By Number
router.get("/search-by-number", auth, async (req, res) => {
  let searchQ = req.query.q;
  try {
    const data = await CardModel.findOne({
      user_id: req.userToken._id,
      cardNumber: searchQ,
    });
    res.json(data);
  } catch (error) {
    res.status(400).json(error);
  }
});

/// search engine And get all cards
// when the search empty the result return all cards
// when the search not empty return the result of the search
router.get("/search", async (req, res) => {
  /// perPage
  let perPage = req.query.perPage ? req.query.perPage : 9;
  /// page
  let page = req.query.page ? req.query.page * perPage : 0;
  /// search value
  let searchQ = req.query.q;
  /// The RegExp is used to perform case-insensitive matching and if the value not 100% matching.
  let expSearchQ = new RegExp(searchQ, "i");
  // status
  let statusQ = req.query.status ? req.query.status : { $exists: true };
  /// rooms
  let roomsQ =
    req.query.rooms > 0 && req.query.rooms < 5 ? req.query.rooms : { $gte: 0 };
  /// bedRooms
  let bedRoomsQ =
    req.query.bedRooms > 0 && req.query.bedRooms < 5
      ? req.query.bedRooms
      : { $gte: 0 };
  /// propertyType
  let propertyTypeQ = req.query.propertyType
    ? req.query.propertyType
    : { $exists: true };
  /// city
  let cityQ = req.query.city ? req.query.city : { $exists: true };
  /// minPrice
  let minPriceQ = req.query.minPrice ? req.query.minPrice : 1;
  /// maxPrice
  let maxPriceQ = req.query.maxPrice ? req.query.maxPrice : 9999999;
  /// price
  let price =
    minPriceQ && maxPriceQ
      ? { $gte: minPriceQ, $lte: maxPriceQ }
      : { $exists: true };

  try {
    const data = await CardModel.find({
      status: statusQ,
      propertyType: propertyTypeQ,
      city: cityQ,
      rooms: roomsQ,
      bedRooms: bedRoomsQ,
      price: price,
      $or: [{ address: expSearchQ }, { city: expSearchQ }],
    }).sort({ createdAt: -1 });

    res.json({
      results: data.length,
      data: data.splice(page, perPage),
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//// get my cards
router.get("/allmyCards", auth, async (req, res) => {
  let perPage = req.query.perPage ? req.query.perPage : 9;
  let page = req.query.page ? req.query.page * perPage : 0;
  const cards = await CardModel.find({ user_id: req.userToken._id })
    .limit(perPage)
    .skip(page)
    .sort({ createdAt: -1 });
  res.send(cards);
});

//count of my cards
router.get("/count/mycards", auth, (req, res) => {
  CardModel.aggregate([
    {
      $match: { user_id: ObjectId(req.userToken._id) },
    },
    {
      $count: "createdAt",
    },
  ])
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

//// change user info in cards
router.put("/change-user-info", auth, async (req, res) => {
  let { error } = validateChangeUserInfo(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    let cardData = await CardModel.updateMany(
      { user_id: req.userToken._id },
      req.body
    );
    res.json(cardData);
  } catch (err) {
    console.log(err);
  }
});

//// get my card by id
router.get("/:id", async (req, res) => {
  let cardData = await CardModel.findOne({ _id: req.params.id });
  res.json(cardData);
});

//// add card
router.post("/", auth, async (req, res) => {
  let { error } = validateCard(req.body);
  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).json({
      errors: listErrors,
    });
  }
  try {
    let card = new CardModel(req.body);
    card.user_id = req.userToken._id;
    card.biz = req.userToken.biz;
    card.cardNumber = await generateCardNumber(CardModel);

    let cardData = await card.save();
    res.status(201).json(cardData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//// Edit  card by id
router.put("/:id", auth, async (req, res) => {
  let { error } = validateCard(req.body);
  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).json({
      errors: listErrors,
    });
  }
  try {
    let cardData = await CardModel.updateOne(
      { _id: req.params.id, user_id: req.userToken._id },
      req.body
    );
    let cardFind = await CardModel.findOne({ _id: req.params.id });
    res.json(cardFind);
  } catch (err) {
    console.log(err);
  }
});
//// delete card
router.delete("/:id", auth, async (req, res) => {
  let card = await CardModel.findOneAndDelete({
    _id: req.params.id,
    user_id: req.userToken._id,
  });
  if (!card) {
    return res.status(400).json({ msg: "card not found and cant be delted" });
  }
  res.json(card);
});

module.exports = router;
