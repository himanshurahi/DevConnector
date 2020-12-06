const mongoose = require("mongoose");
require("dotenv").config();
const db = () => {
  mongoose
    .connect(process.env.DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("error in Connection");
    });
};

module.exports = db;
