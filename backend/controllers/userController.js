import User from '../models/userModel.js'
import genrateToken from '../utils/genrateToken.js'
import asynHandler from 'express-async-handler'


 //@desp    Auth the user and get token
//@route    GET /api/users/login
//@access   Public
const authUser= asynHandler(async(req,res) =>{
    
  const {email,password}=req.body

  const user =await User.findOne({email})    

  if(user && (await user.matchPassword(password))){
    res.json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:genrateToken(user._id)
    })
  }else{
      res.status(404)
      throw new Error('Invalid Email or Password')
  }
})



//@desp    GET user profile
//@route    GET /api/users/profile
//@access   Private

const getUserProfile= asynHandler(async(req,res) =>{
   const user = await User.findById(req.user._id)

   if(user){
      res.json({
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:user.token,
      })
   }else{
     res.status(404)
     throw new Error('Invalid Username Password')
   }
  


})

//@desp    Update user profile
//@route    PUT /api/users/profile
//@access   Private

const updateUserProfile= asynHandler(async(req,res) =>{
  const user = await User.findById(req.user._id)

  if(user){
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    if(req.body.password){
      user.password=req.body.password
    }

    const updatedUser =await user.save()
    res.json({
      _id: updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
      token:genrateToken(updatedUser._id)
  })

  }else{
    res.status(404)
    throw new Error('Invalid Username Password')
  }
 


})

      

 //@desp   Register a new user
//@route    POST /api/users
//@access   Public  
const registerUser= asynHandler(async(req,res) =>{
    
  const {name,email,password}=req.body

  const userExists =await User.findOne({email})    

  if(userExists){
    res.status(400)
    throw new Error('User Already Exsits')
  }
  const user = await User.create({
    name,
    email,
    password
  })

  if(user){
    res.status(201).json({
      _id: user._id,
      name:user.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:genrateToken(user._id)
    })

  }else{
    res.status(400)
    throw new Error('Invalid')
  }


})


//@desp    GET all user
//@route    GET /api/users
//@access   Private/ADMIN

const getUsers= asynHandler(async(req,res) =>{
  const users =await User.find({})
  res.json(users)


})



//@desp   DELETE user
//@route    DELETE /api/users/:id
//@access   Private/ADMIN

const deleteUser= asynHandler(async(req,res) =>{
  const user =await User.findById(req.params.id)
  
  if(user){
    await user.remove()
    res.json({message: 'User Removed'})
  }else{
    res.status(404)
    throw new Error('User Not Found')
  }


})  



//@desp    GET user by id
//@route    GET /api/users/:id
//@access   Private/ADMIN

const getUsersById= asynHandler(async(req,res) =>{
  const user =await User.findById(req.params.id).select('-password')
  if(user){
    res.json(user)
  }else{
    res.status(404)
    throw new Error('User Not Found')
  }
 


})



//@desp    Update user 
//@route    PUT /api/users/:id
//@access   Private/Admin

const updateUser= asynHandler(async(req,res) =>{

  const user = await User.findById(req.params.id)

  if(user){
    user.name=req.body.name||user.name
    user.email=req.body.email||user.email
    user.isAdmin= req.body.isAdmin
    //||user.isAdmin

    const updatedUser =await user.save()

    res.json({
      _id: updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      isAdmin:updatedUser.isAdmin,
 
  })

  }else{
    res.status(404)
    throw new Error('Invalid Username Password')
  }
 
})










export{
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUsersById,
    updateUser,
} 