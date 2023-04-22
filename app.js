const express = require("express");
const app = express();
const PORT = process.env.PORT || 2100;
const mongoose = require("mongoose");
const bookRouters = require("./routers/books");
const customerRouters = require("./routers/customer");
const auth = require("./middleware/auth");
require("dotenv/config");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");

// CONFIGURATION
cloudinary.config({
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  cloud_name: process.env.cloud_name,
});

// middleware
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bookRouters);
app.use(customerRouters);
app.get("/", auth, (req, res) => {
  console.log(req.user);
  res.send("auth worked");
});

// DB CONNECTION
const DB = () => {
  mongoose
    .connect(process.env.dburl)
    .then(() => {
      app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
      
      });
    })
    .catch((err) => {
      throw err;
    });
};

// listening to server
DB()

