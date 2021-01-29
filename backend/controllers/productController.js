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

//@desp   DELETE product
//@route    DELETE /api/products/:id
//@access   Private/ADMIN

const deleteProduct= asynHandler(async(req,res) =>{
    const product =await Product.findById(req.params.id)
    
    if(product){
      await product.remove()
      res.json({message: 'Product Removed'})
    }else{
      res.status(404)
      throw new Error('Product Not Found')
    }
  
  
  })  


//@desp   CREATE product
//@route    post /api/products
//@access   Private/ADMIN

const createProduct= asynHandler(async(req,res) =>{
  const product= new Product({
    name:'Sample Name',
    price:'0',
    user:req.user._id,
    image: '/images/sample.jpg',
    category:'Sample Category',
    countInStock:0,
    packsize:'Sample Pack Size',
    numReview:0,
    description:'Sample Description',
    benefits:'sample benefits'
  })

  const createdProduct =await product.save()
  res.status(201).json(createdProduct)

})  


//@desp   UPDATE product
//@route    put /api/products/:id
//@access   Private/ADMIN

const updateProduct= asynHandler(async(req,res) =>{
  const {name,price,description,image,category,countInStock,benefits,packsize}= req.body
  const product= await Product.findById(req.params.id)

if(product){

  product.name=name
  product.price=price
  product.description=description
  product.category=category
  product.image=image
  product.countInStock=countInStock
  product.benefits=benefits
  product.packsize=packsize

  const updatedProduct =await product.save()
  res.json(updatedProduct)
}else{
  res.status(404)
  throw new Error('Product Not Found')
}


}) 
  



export{
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}