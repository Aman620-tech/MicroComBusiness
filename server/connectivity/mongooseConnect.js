const mongoose = require("mongoose");

const con = mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  (err) => {
    if (err) {
      return console.log({ Error: err.message });
    }
    console.log("Connected");
  }
);
const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
console.log(DB);
