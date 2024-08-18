const Product = require("../models/product.model");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("req.body", req.body);
  try {
    const product = await Product.create(req.body);
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
    const search = req.query.search ; 
    let products
     let totalPages
    if(!search){
       products = await Product.find().skip(skip).limit(size).lean().exec();
       totalPages = Math.ceil((await Product.find().countDocuments())/size)
    }else{
       products = await Product.find({name:search}).skip(skip).limit(size).lean().exec();
       totalPages = Math.ceil((await Product.find().countDocuments())/size)
    }
    
    return res.status(200).send({products,totalPages});
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

// router.patch("/:id" , async(req,res)=>{
//     try{
//       const product = await Product.findByIdAndUpdate(
//         req.params.id,
//         req.body,
//         {new:true})
//     }catch(err){
//     return res.status(500).send(err.message);
//     }
// })

// router.delete("/:id" , async(req,res)=>{
//     try{
//       const product = await Product.findByIdAndDelete(req.params.id)
//       return res.status(201).send(product) ;
//     }catch(err){
//       return res.status(500).send(err.message);
//     }
// })

module.exports = router;



