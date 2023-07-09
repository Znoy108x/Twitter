const express = require("express");
const app = express();
const colors = require("colors");
require("dotenv").config();

// cors
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    origin: [process.env.FRONTEND_ORIGIN],
  })
);
//

// data base
const db = require("./db");
db();
//

var multer = require("multer");
app.use(express.json());

// routes
app.use(
  process.env.IMAGE_AND_VIDEO_ASSETS,
  express.static(__dirname + process.env.ACCESS_IMAGE_AND_VIDEO)
);
app.use(
  process.env.VIDEO_ASSETS,
  express.static(__dirname + process.env.ACCESS_VIDEO)
);
app.use(
  process.env.IMAGE_ASSETS,
  express.static(__dirname + process.env.ACCESS_IMAGE)
);

app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/post"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Backend running on Port ${port}`.rainbow);
});
