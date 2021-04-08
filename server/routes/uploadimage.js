const express = require("express");
const multer = require("multer");
const fs = require("fs");
const router = express.Router();
const { UserModel } = require("../models/user");
const { CardModel } = require("../models/card");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cd) {
    cd(null, "public");
  },
  filename: function (req, file, cd) {
    const parts = file.mimetype.split("/");
    cd(null, `${file.originalname}-${Date.now()}.${parts[1]}`);
  },
});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/psd"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("only .png .jpg .jpeg .gif .psd"));
  }
};

const MAXSIZE = 5 * 1024 * 1024;

const uploadUserAvatir = multer({
  storage,
  fileFilter: filefilter,
  limits: { fileSize: MAXSIZE },
}).single("avatar");

const uploadCardImages = multer({
  storage,
  fileFilter: filefilter,
  limits: { fileSize: MAXSIZE },
}).array("images");

router.post("/save-user-avatir", (req, res) => {
  uploadUserAvatir(req, res, (error) => {
    if (error && error.message) {
      res.json({ error: error.message });
    } else {
      res.json({
        file: {
          path: `/public/${req.file.filename}`,
          name: req.file.originalname,
        },
      });
    }
  });
});

router.put("/delete-user-avatir", auth, async (req, res) => {
  const path = req.body.image.file.path;
  const checkUser = await UserModel.findOne({
    _id: req.userToken._id,
    image: req.body.image,
  });
  if (checkUser) {
    if (path === "/public/defula_avatir_image.png") {
      return res.send("deleted ");
    }
    fs.unlink(`${__dirname}/..${path}`, (err) => {
      if (err) {
        return res.json({ error: err.message });
      } else {
        return res.send("deleted ");
      }
    });
  } else {
    res.send("you are not the owner of the image don't try again");
  }
});

router.post("/save-card-images", auth, (req, res) => {
  uploadCardImages(req, res, (error) => {
    if (error && error.message) {
      res.json({ error: error.message });
    } else {
      let filesArray = [];
      if (req.files.length <= 5) {
        req.files.forEach((file) => {
          filesArray.push({
            file: {
              path: `/public/${file.filename}`,
              name: file.originalname,
            },
          });
        });
        res.json({ images: filesArray, message: "upload files succeed" });
      } else {
        res.json("you cant send mory of 5 images");
      }
    }
  });
});

//// this function get files paths and removed from the public folder
const deleteFiles = (files, callback) => {
  var i = files.length;
  files.forEach((filepath) => {
    fs.unlink(filepath, (err) => {
      i--;
      if (err) {
        return callback(err);
      } else if (i <= 0) {
        return callback(null);
      }
    });
  });
};

router.put("/delete-cards-images", auth, async (req, res) => {
  try {
    const checkCard = await CardModel.findOne(
      {
        user_id: req.userToken._id,
        cardNumber: req.body.cardNumber,
        images: { $in: req.body.images },
      },
      { images: 1, _id: 0 }
    );
    imagesPaths = [];
    for (let i = 0; i < req.body.images.length; i++) {
      imagesPaths.push(`${__dirname}/..${req.body.images[i].file.path}`);
    }
    if (checkCard) {
      deleteFiles(imagesPaths, function (err) {
        if (err && err.message) {
          console.log(err.message);
        }
      });
      res.send("all images deleted");
    } else {
      res.send("you are not the owner of the images don't try again");
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
