const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const { routersInit } = require("./routes/app_routers");
const cors = require("cors");
const mongodb = require("./db/mongoConnect");
const { secret } = require("./config/secret");
app.use(
  cors({
    origin: secret.CLIENT_URL,
  })
);
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));
routersInit(app);

const port = 3001;
http.listen(port, () => console.log(`Listening on port ${port}...`));
