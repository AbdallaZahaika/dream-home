const mongoose = require("mongoose");
const Joi = require("joi");
const cardSchema = new mongoose.Schema({
  propertyType: String,
  houseSpace: Number,
  bedRooms: Number,
  livingRooms: Number,
  bathRooms: Number,
  kitchens: Number,
  floor: Number,
  ParkingSpots: Number,
  Description: String,
  address: String,
  images: Array,
  features: { type: Array, default: [] },
  status: String,
  price: Number,
  rooms: Number,
  cardNumber: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99999999999,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  favorites: {
    type: Number,
    default: 0,
  },
  userName: String,
  userPhone: String,
  userContactEmail: String,
  userImage: Object,
  city: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  biz: {
    type: Boolean,
    default: false,
  },
});

exports.CardModel = mongoose.model("cards", cardSchema);

exports.generateCardNumber = async (CardModel) => {
  while (true) {
    let randomNumber = Math.floor(Math.random() * 899000) + 100000;
    let card = await CardModel.findOne({ cardNumber: randomNumber });
    if (!card) {
      return String(randomNumber);
    }
  }
};

////////// schema reagex user ContactEmail
const emailRegExp = /^[a-z0-9\._\-\+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

exports.validateCard = (_card) => {
  const schema = Joi.object({
    propertyType: Joi.string().min(2).max(255).required(),
    houseSpace: Joi.number().min(1).max(9999999).required(),
    bedRooms: Joi.number().min(0).max(99999).required(),
    livingRooms: Joi.number().min(0).max(99999).required(),
    bathRooms: Joi.number().min(0).max(99999).required(),
    kitchens: Joi.number().min(0).max(99999).required(),
    floor: Joi.number().min(0).max(1000).required(),
    ParkingSpots: Joi.number().min(0).max(1000).required(),
    address: Joi.string().min(2).max(400).required(),
    city: Joi.string().min(1).max(70).required(),
    Description: Joi.string().min(2).max(1024),
    images: Joi.array().items(Joi.object()).min(1).max(5).required(),
    features: Joi.array().max(25),
    status: Joi.string().max(100).required(),
    price: Joi.number().min(1).max(999999999).required(),
    rooms: Joi.number().min(1).max(5000).required(),
    userName: Joi.string().min(2).max(255).required(),
    userContactEmail: Joi.string().min(6).max(255).regex(emailRegExp),
    userPhone: Joi.string().min(9).max(10).regex(phoneRegExp).required(),
    userImage: Joi.object(),
  });
  return schema.validate(_card, { abortEarly: false });
};

exports.validateChangeUserInfo = (_card) => {
  const schema = Joi.object({
    userName: Joi.string().min(2).max(255).required(),
    userContactEmail: Joi.string().min(6).max(255).regex(emailRegExp),
    userPhone: Joi.string().min(9).max(10).regex(phoneRegExp).required(),
    userImage: Joi.object(),
  });
  return schema.validate(_card);
};
