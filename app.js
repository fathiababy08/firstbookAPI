const express = require("express");
const app = express();
const PORT = process.env.PORT || 2100;
const mongoose = require("mongoose");
const bookRouters = require("./routers/books");
const customerRouters = require("./routers/customer");
const cors = require("cors")
const bodyParser = require("body-parser")
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
app.use(cors({
  origin:"*",
})
);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bookRouters);
app.use(customerRouters);
app.get("/showmeuser", auth, (req, res) => {
  res.status(200).json({success: true, name: req.user.username})
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

