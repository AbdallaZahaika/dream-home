const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  address: String,
  image: Object,
  contactEmail: String,
  resetLink: {
    data: String,
    default: "",
  },
  biz: {
    type: Boolean,
    default: false,
  },
  cards: Array,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
exports.UserModel = mongoose.model("users", userSchema);

////////// schema reagex Email
const emailRegExp = /^[a-z0-9\._\-\+]{2,50}@[a-z\-0-9]+(\.[a-z]{2,10})+$/i;

////////// schema reagex Phone
const phoneRegExp = /^0[2-9]\d{7,8}$/;

/////////// Schema Reagex Password
const lowerCaseRegExp = /(?=.*[a-z])/;
const upperCaseRegExp = /(?=.*[A-Z])/;
const numericRegExp = /(?=.*[0-9])/;
//// validate create user
exports.validateUser = (_user) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().regex(emailRegExp),
    contactEmail: Joi.string().min(6).max(255).regex(emailRegExp),
    password: Joi.string()
      .min(6)
      .max(1024)
      .regex(lowerCaseRegExp)
      .regex(upperCaseRegExp)
      .regex(numericRegExp)
      .required(),
    phone: Joi.string().min(9).max(10).regex(phoneRegExp).required(),
    address: Joi.string().min(2).max(400).required(),
    image: Joi.object(),
    biz: Joi.boolean(),
  });
  return schema.validate(_user, { abortEarly: false });
};
//// validate Edit user
exports.validateEditUser = (_user) => {
  let schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    contactEmail: Joi.string().min(6).max(255).regex(emailRegExp),
    phone: Joi.string().min(9).max(10).regex(phoneRegExp).required(),
    address: Joi.string().min(2).max(400).required(),
    image: Joi.object(),
  });
  return schema.validate(_user, { abortEarly: false });
};
/// validate change password
exports.validatePassword = (password) => {
  const schema = Joi.object({
    password: Joi.string().max(1024).required(),
    newPassword: Joi.string()
      .min(6)
      .max(1024)
      .regex(lowerCaseRegExp)
      .regex(upperCaseRegExp)
      .regex(numericRegExp)
      .required(),
  });
  return schema.validate(password);
};
/// validate favorite cards
exports.validateCards = (card) => {
  const schema = Joi.object({
    cards: Joi.array().min(1).max(1).required(),
  });
  return schema.validate(card);
};

///validate
exports.validateEmail = (_email) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().regex(emailRegExp),
  });
  return schema.validate(_email);
};

exports.validateResetPassword = (_password) => {
  const schema = Joi.object({
    newPassword: Joi.string()
      .min(6)
      .max(1024)
      .regex(lowerCaseRegExp)
      .regex(upperCaseRegExp)
      .regex(numericRegExp)
      .required(),
    resetLink: Joi.string().required(),
  });

  return schema.validate(_password);
};
