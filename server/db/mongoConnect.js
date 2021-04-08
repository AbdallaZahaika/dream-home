const mongoose = require("mongoose");
const { secret } = require("../config/secret");

mongoose.connect(`mongodb://localhost/dreamhome`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("mongo connected");
});

module.exports = db;
