const express = require("express");
const router = express.Router();
const customer = require("../model/customerModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BOOKES = require("../model/bookesModel");
const purchase = require("../model/purchaseModel")

// signUp route
router.post("/signUp", async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    // check for input fields
    if (!userName && !email && !password) {
      return res.status(400).json({ message: "please fill all the fields" });
    }
    // check for already existing email
    const emailExist = await customer.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "email already exists" });
    }
    // check for already existing userName
    const userNameExist = await customer.findOne({ userName });
    if (userNameExist) {
      return res.status(400).json({ message: "userName already exists" });
    }

    // hashing the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = await customer.create({
      userName,
      email,
      password: hashedPassword,
    });

    // create a jwt token
    const token = jwt.sign(
      {
        id: newCustomer._id,
        userName,
        email,
      },
      process.env.JWT_SECRET
    );

    // send the token to the client
    res.status(200).json({ message:'sign up successful', newCustomer, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// sinIn route
router.post("/signIn", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName && !password) {
      return res.status(400).json({ message: "please fill all the fields" });
    }

    const userNameExist = await customer.findOne({ userName });
    if (!userNameExist) {
      return res.status(400).json({ message: "user not found, please register" });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      userNameExist.password
    );
    console.log(passwordCorrect);
    if (!passwordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // create a jwt token
    const token = jwt.sign(
      {
        id: userNameExist._id,
        userName: userNameExist.userName,
        email: userNameExist.email,
      },
      process.env.JWT_SECRET)

    res.status(200).json({message: 'signIn sucessful',
      user: {
        _id: userNameExist._id,
        userName: userNameExist.userName,
        email: userNameExist.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// singOut route
router.post("/signOut", async (req, res) => {
    const token = 'signOut'
    res.status(200).json({message: 'sign out successfull'})
});


      


module.exports = router;
