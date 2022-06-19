const express = require("express");
const router = require("./Router/router");
const app = express();
const cors = require("cors");
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const upload = require("./imageuploader");
const path = require("path");
const compression = require("compression");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression())


app.use(express.static(path.join(__dirname, "upload/images")));
// app.use('/upload/images', express.static('images'))
router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept",
    "Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE",
    "Access-Control-Allow-Origin",
    "*"
  );
  next();
});

app.use(router);

const PORT =  process.env.PORT ||5000;


if (process.env.NODE_ENV == 'production') {
  app.use(express.static("frontend/build"))
}
sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`the post is listning on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("-----err appjs sequlize", err);
  });
