const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");
const User = require("../models/user.model");
const transporter = require("../configs/email");
const sendEmail = require("../utils/sendEmail");
const path = require('path');

router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const user = await User.findById(product.user_id).lean().exec(); // here just finding the user who created that product and access that email id from there and send email for product created
    var message = {
      // here we create the massage for sending
      from: "shekhar.shashi735@gmail.com",
      to: [user.email, "A@gmail.com", "a@a.com"],
      subject: "Product created",
      text: "Hi your producted is created",
      html: "<p>producted is created</p>",
      attachments:
        [
          { filename: "name.txt", path: path.join(__dirname, "../name.txt") },  // you can also send diffrent type of file in attchment
        ] || null,
    };  
    sendEmail(message);

    return res.status(201).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1; // any thing that you pass after the questionmarks that is query parameter
    const size = +req.query.size || 10; // || or operater use when size or page pass from query
    const skip = (page - 1) * size; // how many items do we skip
    const search = req.query.search;
    let products;
    let totalPages;
    if (!search) {
      products = await Product.find().skip(skip).limit(size).lean().exec();
      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    } else {
      products = await Product.find({ name: search })
        .skip(skip)
        .limit(size)
        .lean()
        .exec();
      totalPages = Math.ceil((await Product.find().countDocuments()) / size);
    }

    return res.status(200).send({ products, totalPages });
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// this is the complete pagination
//  page = req.query.page
//  size = req.query.size
//  skip = (page-1)*size
//  Product.find().skip(skip).limit(size).lean().exec();
//  totalpage = Math.ceil(await Product.find().countDocument()/size)

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean().exec();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
