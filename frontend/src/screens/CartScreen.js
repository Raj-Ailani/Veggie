import React,{useEffect} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card, ListGroupItem, Container, FormControl,Alert} from 'react-bootstrap'

import {addToCart,removeFromCart} from '../actions/cartActions' 




const CartScreen = ({match,location,history}) => {
    const productId=match.params.id
    const qty=location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart=useSelector((state =>state.cart))
    const {cartItems} =cart

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }
        
    }, [dispatch,productId,qty])

    const removeFromCartHandler=(id) =>{
        dispatch(removeFromCart(id))
     } 



    return (
        <Container className='cartPage'>
        <h1>Shopping Cart</h1>

        <Row>
       
            <Col md={8}>
                
                {cartItems.length === 0 ? <div class="alert alert-info" role="alert" id='alert'>Your Cart is empty <Link to="/home">Go Back</Link></div> :
                (
                    <ListGroup variant='flush'>
                        {
                            cartItems.map(item =>(
                                <ListGroupItem key={item.product} id='cart-items'>
                                    <Row>
                                        <Col md={2} xs={3} sm={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={3} xs={2} sm={2}>
                                             <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2} xs={2} sm={2} >
                                        ₹{item.price}    
                                         </Col>
                                         <Col md={3} xs={4} sm={3}>
                                         <FormControl as='select' value={item.qty} onChange={(e)=>
                                            dispatch(addToCart(item.product,Number(e.target.value)))}>
                                            {
                                            [...Array(item.countInStock).keys()].map((x) =>(
                                                <option key={x + 1} value={x+1} >
                                                    {x+1}
                                                </option>
                                            ))
                                        }   
                                        </FormControl>  
                                        </Col>
                                        <Col md={2} xs={1} style={{ padding: '0px' }}> 
                                            <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)} >
                                                <i className='fas fa-trash' />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                             
                            ))
                           
                        }
                          <div class="alert alert-info" role="alert" id='alert'>Want to Shop More? <Link to="/home">Click here</Link></div>
                    </ListGroup>

                )
                }
               
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush' >
                        <ListGroupItem className="border-bottom-0" id='subtotal'>
                            <h3>Subtotal   ({cartItems.reduce((acc,item)=> acc+item.qty,0)}) items</h3>
                            ₹{cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                        </ListGroupItem>
                        <ListGroupItem id='checkout'>
                            <Button type='button' className='btn-block' disabled={cartItems.length===0} >Proceed To Checkout</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>

            </Col>
         
        </Row>
    </Container>
    )
}

export default CartScreen
