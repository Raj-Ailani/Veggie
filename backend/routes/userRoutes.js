import express from 'express'
import {authUser,deleteUser,getUserProfile,getUsers,registerUser, updateUserProfile,getUsersById,updateUser    } from '../controllers/userController.js'
import {protect,admin} from '../middleware/authMiddleware.js' 



const router =express.Router()
router.route('/').post(registerUser).get(protect,admin,getUsers)
// router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect ,getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUsersById).put(protect,admin,updateUser)
 


export default router