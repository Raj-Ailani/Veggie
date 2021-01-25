import express from 'express'
import {addOrderItem,getOrderById, updateOrderToPaid,getMyOrders} from '../controllers/orderController.js'
import {protect} from '../middleware/authMiddleware.js'


const router =express.Router()

router.route('/').post(protect,addOrderItem)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)
    


export default router