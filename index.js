const express = require("express");
const mongoose = require('mongoose');


// express app initiatization
const app = express();
app.use(express.json());

// database connection with mongoose
mongoose.connect('mongodb://localhost/todos')
  .then(() => console.log("connetion successful"))
  .catch((err)=> console.log(err));

// application routes

// defauults error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
