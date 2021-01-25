import React, { useState,useEffect } from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2' 
import { Container,Button,Row,Col,ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import {getOrderDetails, payOrder} from '../actions/orderActions'
import { Message } from '../components/Message'
import { ORDER_PAY_RESET } from '../constants/orderConstants'



const OrderScreen = ({match}) => {
    const dispatch = useDispatch()
    const orderId=match.params.id

    const [sdkReady,setSdkReady]=useState(false)
   

    
    const orderDetails =useSelector(state => state.orderDetails)
    const {order,loading,error,paymentMethod}=orderDetails
    
    const orderPay =useSelector(state => state.orderPay)
    const {success:successPay,loading:loadingPay}=orderPay



    useEffect(()=>{
        const addPaypalScript =async()=>{
            const {data:clientId}=await axios.get('/api/config/paypal')
            const script=document.createElement('script')
            script.type ='text/javascript'
            script.async=true
            script.scr=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }   
        if(!order || successPay){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
    
   
    },[dispatch,orderId,successPay,order])

  const successPaymentHandler =(paymentResult)=>{
    
    dispatch(payOrder(orderId,paymentResult))
  }


    return (
        <Container className='cartPage'>
            <h2>Order {orderId}</h2>
             {loading ? <Loader /> : error? <Message varient='danger'>{error}</Message> : 
                 <Row id='form'>
                 <Col md={8}>
                     <ListGroup varient='flush'>
                        <ListGroupItem  className="border-right-0  border-left-0 border-top-0 ">
                            <h2>Shipping</h2>
                            <p>
                                <strong>
                                    Address:    
                                </strong>
                                {order.shippingAddress.address},{order.shippingAddress.city}
                                ,{order.shippingAddress.postalCode},  {order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered  ? <div class="alert alert-success" role="alert" id='wrong'>Deliverd At {order.deleveredAt}</div>: <div class="alert alert-danger" role="alert" id='wrong'>Not Delivered </div>
                            }
                        </ListGroupItem>
                        <ListGroupItem  className="border-right-0  border-left-0">
                            <h2>Payment Method</h2>
                            <p>
                                <strong>
                                    Method:    
                                </strong>
                                {order.paymentMethod }
                            </p>{
                                order.isPaid  ?<div class="alert alert-success" role="alert" id='wrong'>Paid On {order.paidAt}</div>:<div class="alert alert-danger" role="alert" id='wrong'>Not Paid</div>
                            }
                        </ListGroupItem>
                        <ListGroupItem  className="border-right-0  border-left-0">
                            <h2>Order Items </h2>
                            {order.orderItems.length===0 ? <p>Order Is Empty</p>:(
                                <ListGroup>
                                    {
                                            order.orderItems.map((item,index)=>(
                                                <ListGroupItem className="border-0" key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />

                                                    </Col>
                                                    <Col>
                                                         <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ₹{item.price} = ₹{item.price*item.qty}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))
                                    }
                                </ListGroup>                                        
                            )}
                        </ListGroupItem>
                     </ListGroup>
                 </Col>
                 <Col md={4}>
                     <Card>
                         <ListGroup>
                             <ListGroupItem>
                                 <h2>Order Summary</h2>
                             </ListGroupItem>
                             <ListGroupItem>
                                 <Row>
                                     <Col>Items</Col>
                                    <Col>${order.itemPrice}</Col>
                                 </Row>
                             </ListGroupItem>
                             <ListGroupItem>
                                 <Row>
                                     <Col>Shipping</Col>
                                    <Col>₹{order.shippingPrice}</Col>
                                 </Row>
                             </ListGroupItem>
                             <ListGroupItem>
                                 <Row>
                                     <Col>Tax</Col>
                                    <Col>   {order.taxPrice}</Col>
                                 </Row>
                             </ListGroupItem>
                             <ListGroupItem>
                                 <Row>
                                     <Col>Total</Col>
                                    <Col>₹{order.totalPrice}</Col>
                                 </Row>
                             </ListGroupItem>
                            

                             
                             {!order.isPaid && order.paymentMethod==='COD'&& (
                              <ListGroupItem>
                                  
                                  <div class="alert alert-primary" role="alert" id='wrong'>  Product Will Be Deliverd Soon</div>
                              </ListGroupItem>       
                             )}
       






                             {!order.isPaid &&  order.paymentMethod==='PayPal' &&(
                              <ListGroupItem>
                                  
                                  {loadingPay && <Loader />}
                                  { sdkReady ? <Loader /> :
                                  
                                  (
                                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                  )}
                              </ListGroupItem>       
                             )}

                        


                             
                         </ListGroup>
                     </Card>
                 </Col>
             </Row> 
             
             }
                
        </Container>
    )
}

export default OrderScreen
