import Order from '../models/orderModel.js'
import asynHandler from 'express-async-handler'

//@desp    Create new order
//@route    POST /api/order
//@access   Private
const addOrderItem= asynHandler(async(req,res) =>{
    const {orderItems,shippingAddress,paymentMethod,itemPrice,taxPrice,shippingPrice,totalPrice} =req.body
    if(orderItems && orderItems.length===0){
        res.status(400)
        throw new Error('No order Item')
        return
    }else{
        const order = new Order({
            orderItems,
            user:req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder =await order.save()
        res.status(201).json(createdOrder)
    }
})

//@desp    GET order by Id
//@route    GET /api/order/:id
//@access   Private
const getOrderById= asynHandler(async(req,res) =>{
  const order= await Order.findById(req.params.id).populate('user','name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order Not Found')
    }

})




//@desp    Update Order To Paid
//@route    GET /api/order/:id/pay
//@access   Private
const updateOrderToPaid= asynHandler(async(req,res) =>{
    const order= await Order.findById(req.params.id)
  
      if(order){
        order.isPaid = true
        order.paidAt=Date.now()
        order.paymentResult={
            id:req.body.id,
            status:req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
        }

        const updatedOrder=await order.save()
        res.json(updatedOrder)
      }else{
          res.status(404)
          throw new Error('Order Not Found')
      }
  
  })


//@desp   GET logged in user order
//@route    GET /api/order/myorders
//@access   Private
const getMyOrders= asynHandler(async(req,res) =>{
    const orders = await Order.find({user:req.user})
    res.json(orders)
  })

  
//@desp   GET all order
//@route    GET /api/orders
//@access   Private/Admin
const getOrders= asynHandler(async(req,res) =>{
    const orders = await Order.find({}).populate('user','id name')
    res.json(orders)
  })



//@desp    Update Order To delivered
//@route    GET /api/order/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered= asynHandler(async(req,res) =>{
    const order= await Order.findById(req.params.id)
  
      if(order){
        order.isDelivered = true
        order.deliveredAt=Date.now()


        const updatedOrder=await order.save()
        res.json(updatedOrder)
      }else{
          res.status(404)
          throw new Error('Order Not Found')
      }
  
  })


  //@desp    Update Order To Paid
//@route    GET /api/order/:id/paid
//@access   Private/Admin
const updateOrderToCODPaid= asynHandler(async(req,res) =>{
  const order= await Order.findById(req.params.id)

    if(order){
      order.isPaid = true
      order.paidAt=Date.now()


      const updatedOrder=await order.save()
      res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order Not Found')
    }

})






export { addOrderItem,
    getOrderById,
    updateOrderToPaid,
        getMyOrders,
    getOrders,
    updateOrderToDelivered,
    updateOrderToCODPaid}