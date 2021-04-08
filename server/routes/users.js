const express = require("express");
const {
  UserModel,
  validateCards,
  validateUser,
  validateEditUser,
  validatePassword,
  validateResetPassword,
  validateEmail,
} = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");
const auth = require("../middleware/auth");
const { CardModel } = require("../models/card");
const { sendEmail } = require("./email");
const router = express.Router();

//// get cards by cardNumber
const getCards = async (cardsArray) => {
  const cards = await CardModel.find({ cardNumber: { $in: cardsArray } });
  return cards;
};
//// get card owner information
router.get("/info-to-card/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await UserModel.findOne(
      { _id: id },
      { image: 1, name: 1, contactEmail: 1, phone: 1, biz: 1, _id: 0 }
    );
    res.json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
////// all favorite Cards
router.get("/favoriteCards", auth, async (req, res) => {
  if (!req.query.numbers) {
    return res.status(400).send("Missing numbers data");
  }
  let data = {};
  data.cards = req.query.numbers.split(",");
  const cards = await getCards(data.cards);
  res.send(cards);
});

//// to add favorite  card  in user.cards and remove  favorited
router.patch("/favorite", auth, async (req, res) => {
  const { error } = validateCards(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const data = await UserModel.updateOne(
      { _id: req.userToken._id },
      {
        $addToSet: {
          cards: req.body.cards,
        },
      }
    );
    if (data.nModified === 1) {
      /// Increase the number of favorites in card
      await CardModel.updateOne(
        { cardNumber: req.body.cards[0] },
        { $inc: { favorites: +1 } }
      );
    }
    if (data.nModified === 0) {
      await UserModel.updateOne(
        { _id: req.userToken._id },
        {
          $pull: {
            cards: { $in: req.body.cards },
          },
        }
      );
      /// Decrease a number of favorites in card
      await CardModel.updateOne(
        { cardNumber: req.body.cards[0] },
        { $inc: { favorites: -1 } }
      );
      return res.send("unFavorited");
    }
    res.send("favorited");
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

//// user information
router.get("/me", auth, async (req, res) => {
  try {
    const userData = await UserModel.findOne(
      { _id: req.userToken._id },
      { password: 0, __v: 0 }
    );
    res.json(userData);
  } catch (error) {
    res.status(400).json(error);
  }
});
/// Edit user
router.put("/edit", auth, async (req, res) => {
  const { error } = validateEditUser(req.body);
  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).send({
      errors: listErrors,
    });
  }
  try {
    const user = await UserModel.updateOne(
      { _id: req.userToken._id },
      req.body
    );
    res.json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});
//// chagne user password
router.patch("/changePassword", auth, async (req, res) => {
  const { error } = validatePassword(req.body);
  if (error) {
    const listErrors = {};
    for (const detail of error.details) {
      listErrors[detail.path[0]] = detail.message;
    }
    return res.status(400).send({
      errors: listErrors,
    });
  }
  try {
    const { password } = await UserModel.findOne({ _id: req.userToken._id });
    const validPassword = await bcrypt.compare(req.body.password, password);
    if (!validPassword) {
      return res.status(400).json({ errors: { password: "Invalid password" } });
    }
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);
    const data = await UserModel.updateOne(
      { _id: req.userToken._id },
      { password: newPassword }
    );
    res.status(201).json(data);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});
//// add new user
router.post("/", async (req, res) => {
  let { error } = validateUser(req.body);
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
    let userData = await UserModel.findOne({ email: req.body.email });
    if (userData)
      return res.status(400).json({
        errors: {
          email: "User already registered.",
        },
      });
    let user = new UserModel(req.body);
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let defaultImg = {
      file: {
        path: "/public/defula_avatir_image.png",
        name: "defula_avatir_image",
      },
    };
    user.image = user.image || defaultImg;
    await user.save();
    res.json(_.pick(user, ["createdAt", "_id", "name", "email"]));
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.errmsg });
  }
});

//// send forgot password email
router.put("/forgotPassword", async (req, res) => {
  ///// return errors
  let { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({
        error: "email not exists",
      });
    }
    const { email, _id } = user;

    /// token sign
    const token = Jwt.sign(
      { email: email, id: _id },
      secret.RESET_PASSWORD_KEY,
      {
        expiresIn: "20m",
      }
    );

    //////// Created Date
    const date = new Date();
    const Created =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate() +
      ":" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    //// output of email
    const output = `
     <h3>Reset Password</h3>
     <p>
     A password reset event has been triggered. The password reset window is limited to 20 minutes.
     </p>
      <p>
     If you do not reset your password within 20 minutes, you will need to submit a new request.
    </p>
     <p>
     To complete the password reset process, visit the following link:
    </p>
     <a href="${secret.CLIENT_URL}/reset-password/${token}">http://localhost:3000/reset-password/${token}</a>
       <br/>
       <br/>
     UserEmail: ${email}
     <br/>
     Created:${Created}
     </p>
    `;
    ///////  update user resetLink
    const data = await UserModel.updateOne({ _id }, { resetLink: token });

    ///// return error
    if (!data) {
      return res.status(400).json({ error: "reset password linke error" });
    }

    //// mailOptions
    const mailOptions = {
      from: secret.EMAILACCOUNT,
      to: email,
      subject: "Reset Password",
      html: output,
    };

    //// send email
    const emailResult = await sendEmail(mailOptions);

    res.json(emailResult);
  } catch (error) {
    res.status(400).json({ error });
  }
});

//// verify reset-password-token
const verifyResetPasswordToken = (resetPasswordToken) => {
  return new Promise((resolve, reject) => {
    Jwt.verify(
      resetPasswordToken,
      secret.RESET_PASSWORD_KEY,
      (err, payload) => {
        if (err) {
          return reject(
            "the request expired, you will need to submit a new request"
          );
        }
        const email = payload.email;
        const id = payload.id;
        resolve({ id, email });
      }
    );
  });
};

router.put("/reset-password", async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { resetLink, newPassword } = req.body;

  try {
    if (!resetLink) {
      return res.status(400).json({ error: "Authentication error" });
    }

    const { email, id } = await verifyResetPasswordToken(resetLink);

    if (email && id) {
      const user = await UserModel.findOne({ email, resetLink, _id: id });
      if (!user) {
        return res.status(400).json({
          error: "the request expired, you will need to submit a new request",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const newPasswordBcrypt = await bcrypt.hash(newPassword, salt);

      await UserModel.updateOne(
        { _id: id },
        { password: newPasswordBcrypt, resetLink: "" }
      );

      ///// send email to user
      const date = new Date();
      const Created =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        ":" +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

      //// output of email
      const output = `
      <h3>	Password Change Confirmation </h3>
      <p>
      Your password was successfully changed.
      </p>  
      <br/>
      UserEmail: ${email}
      <br/>
      Created:${Created}
      </p>
      `;

      //// mailOptions
      const mailOptions = {
        from: secret.EMAILACCOUNT,
        to: email,
        subject: "Password Change Confirmation",
        html: output,
      };

      //// send email
      const emailResult = await sendEmail(mailOptions);
      res.json(emailResult);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
