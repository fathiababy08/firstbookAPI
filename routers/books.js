const express = require("express");
const router = express.Router();
const BOOKS = require("../model/bookesModel");
const PURCHASE = require("../model/purchaseModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// to get all books
router.get("/all", async (req, res) => {
  try {
    const books = await BOOKS.find();
    res.status(200).json({ numOfBooks: books.length, books });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

// get popular books
router.get("/popular", async (req, res) => {
  try {
    const books = await BOOKS.find({'ratings': {$gte: 3}});
    res.status(200).json({ numOfBooks: books.length, books });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

// get purchased books
router.get("/purchased", async (req, res) => {
  try {
    const books = await BOOKS.find({'purchased': true});
    res.status(200).json({ numOfBooks: books.length, books });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});


// get bestselling books
router.get("/bestselling", async (req, res) => {
  try {
    const books = await BOOKS.find({'bestselling': true});
    res.status(200).json({ numOfBooks: books.length, books });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});

// to get bookmarked books
router.get("/bookmarked", async (req, res) => {
  try {
    const books = await BOOKS.find({'bookmarked': true});
    res.status(200).json({ numOfBooks: books.length, books });
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
});


// to create new books
router.post("/new", async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      {
        use_filename: true,
        folder: "bookFolder",
      }
    );
    req.body.image = result.secure_url;
    fs.unlinkSync(req.files.image.tempFilePath);

    const createdBook = await BOOKS.create(req.body);
    res.status(200).json({ success: true, data: createdBook });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// to get a specific book
// router.get("/singleBook/:bookId", async (req, res) => {
//   try {
//     const book = await BOOKS.findById({ _id: req.params.bookId });
//     res.status(200).json({ message: "single book gotten", book });
//   } catch (err) {
//     res.status(500).json({ message: "error" });
//   }
// });

// to update a specific book
// router.patch("/update/:bookId", async (req, res) => {
//   try {
//     const book = await BOOKS.findByIdAndUpdate(
//       { _id: req.params.bookId },
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );
//     res.status(200).json({ book });
//   } catch (err) {
//     res.status(500).json({ message: "error" });
//   }
// });

// // to delete a book
// router.delete("/delete/:bookId", async (req, res) => {
//   try {
//     const deleteBook = await BOOKS.findByIdAndDelete({
//       _id: req.params.bookId,
//     });
//     res.status(200).json({ message: "book deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "error" });
//   }
// });

// to search a book
router.get("/search", async (req, res) => {
  try {
    const { title, author} = req.query;
    let queryObject = {};
    if (title) {
      queryObject.title = { $regex: title, $options: "i" };
    }
    if (author) {
      queryObject.author = { $regex: author, $options: "i" };
    }
    
     console.log(queryObject);
    const books = await BOOKS.find(queryObject)
    res.status(200).json({ nbSearch: books.length,  books});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error" });
  }
});

module.exports = router;
