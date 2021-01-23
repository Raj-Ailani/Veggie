import Product from '../models/productModel.js'
import asynHandler from 'express-async-handler'

//@desp     Fetch all product
//@route    GET /api/products
//@access   Public
const getProducts= asynHandler(async(req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

//@desp     Fetch single product
//@route    GET /api/products/id
//@access   Public

const getProductById= asynHandler(async(req,res) =>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)   
    }else{
        res.status(404).json({message:'Product Not Found'})
    }
})


export{
    getProducts,
    getProductById
}