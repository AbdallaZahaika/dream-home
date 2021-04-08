const users = require("./users");
const auth = require("./auth");
const cards = require("./cards");
const contactUs = require("./contactUs");
const uploadimage = require("./uploadimage");
exports.routersInit = (app) => {
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/cards", cards);
  app.use("/api/contactUs", contactUs);
  app.use("/api/uploadImage", uploadimage);
  app.use((req, res) => {
    res.status(404).json({ msg: "404 url page not found" });
  });
};
