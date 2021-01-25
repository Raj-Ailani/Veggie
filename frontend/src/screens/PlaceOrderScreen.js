import React, { useState,useEffect } from 'react'

import { Container,Button,Row,Col,ListGroup,Image,Card, ListGroupItem} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import CheckOutSteps from '../components/CheckOutSteps'

const PlaceOrderScreen = ({history}) => {
    const cart=useSelector(state=> state.cart)
    const dispatch = useDispatch()
    //Calculate Price
    cart.itemsPrice= cart.cartItems.reduce((acc,item)=> acc+item.price*item.qty ,0)
    cart.shippingPrice=cart.itemsPrice>100 ? 0 :100
    cart.taxPrice=Number((0.15*cart.itemsPrice).toFixed(1))
    cart.totalPrice=Number((cart.itemsPrice+cart.shippingPrice+cart.taxPrice).toFixed(1))


    // const orderCreate =useSelector(state => state.orderCreate)
    // const {order,success,error}=orderCreate


    // useEffect(()=>{
    //     if(success){
    //         history.push(`/orders/₹{order._id}`)
    //     }
    //    // eslint-disable-next-line
    // },[history,success])

    // const placeOrderHandler=()=>{
    //     dispatch(createOrder({
    //         orderItems:cart.cartItems,
    //         shippingAddress:cart.shippingAddress,
    //         paymentMethod:cart.paymentMethod,
    //         itemsPrice:cart.itemsPrice,
    //         shippingPrice:cart.shippingPrice,
    //         taxPrice:cart.taxPrice,
    //         totalPrice:cart.totalPrice,
    //     }))   
    // }


    return (
        <Container >
                 <CheckOutSteps step1 step2 step3 step4/>
                 <Row id='form'> 
                     <Col md={8}>
                         <ListGroup varient='flush'>
                            <ListGroupItem  className="border-right-0  border-left-0 border-top-0 ">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>
                                        Address:    
                                    </strong>
                                    {cart.shippingAddress.address},{cart.shippingAddress.city}
                                    ,{cart.shippingAddress.postalCode},  {cart.shippingAddress.country}
                                </p>
                            </ListGroupItem>
                            <ListGroupItem  className="border-right-0  border-left-0">
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>
                                        Method:    
                                    </strong>
                                    {cart.paymentMethod }
                                </p>
                            </ListGroupItem>
                            <ListGroupItem  className="border-right-0  border-left-0">
                                <h2>Order Items </h2>
                                {cart.cartItems.length===0 ? <p>Cart Is Empty</p>:(
                                    <ListGroup>
                                        {
                                            cart.cartItems.map((item,index)=>(
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
                                        <Col>₹{  cart.itemsPrice}</Col>
                                     </Row>
                                 </ListGroupItem>
                                 <ListGroupItem>
                                     <Row>
                                         <Col>Shipping</Col>
                                        <Col>₹{cart.shippingPrice}</Col>
                                     </Row>
                                 </ListGroupItem>
                                 <ListGroupItem>
                                     <Row>
                                         <Col>Tax</Col>
                                        <Col>₹{cart.taxPrice}</Col>
                                     </Row>
                                 </ListGroupItem>
                                 <ListGroupItem>
                                     <Row>
                                         <Col>Total</Col>
                                        <Col>₹{cart.totalPrice}</Col>
                                     </Row>
                                 </ListGroupItem>
                                 <Button type='button' className='btn-block' disabled={cart.cartItems===0}
                                // onClick={placeOrderHandler}
                                >
                                     Place Order

                                 </Button>
                             </ListGroup>
                         </Card>
                     </Col>
                 </Row>
        </Container>
    )
}

export default PlaceOrderScreen
