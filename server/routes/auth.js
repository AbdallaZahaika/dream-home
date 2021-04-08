const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");
const { UserModel } = require("../models/user");
const router = express.Router();

/// login
router.post("/", async (req, res) => {
  let { error } = validLoginUser(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  let user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  let validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  res.json({
    token: generateToken(user._id, user.biz),
    refreshToken: generateRefreshToken(user._id, user.biz),
  });
});

//// generate Token
const generateToken = (_id, _biz) => {
  let token = jwt.sign({ _id: _id, biz: _biz }, secret.JWTSecretKey, {
    expiresIn: "2h",
  });
  return token;
};

//// generate Refresh  Token
const generateRefreshToken = (_id, _biz) => {
  let token = jwt.sign({ _id: _id, biz: _biz }, secret.REFRESH_TOKEN, {
    expiresIn: "1d",
  });
  return token;
};

//// verify refresh-token
const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, secret.REFRESH_TOKEN, (err, payload) => {
      if (err) {
        return reject("invalid refreshToken or expired refreshToken");
      }
      const _id = payload._id;
      const _biz = payload.biz;
      resolve({ _id, _biz });
    });
  });
};

/// refresh token
router.post("/refreshToken", async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).send("Unauthorized");
    }
    const { _id, _biz } = await verifyRefreshToken(refreshToken);

    const token = await generateToken(_id, _biz);
    const refToken = await generateRefreshToken(_id, _biz);
    res.json({
      token: token,
      refreshToken: refToken,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

/// valid Login User
const validLoginUser = (_userBody) => {
  let schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(_userBody);
};

module.exports = router;
