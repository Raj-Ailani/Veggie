import React ,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import { Card, Col, Container, ListGroup, Row } from 'reactstrap'
import {Image, FormControl,ListGroupItem} from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductDetail} from '../actions/productActions'


const ProductScreen = ({history,match}) => {
    const [qty,setQty ] = useState(1)


   const dispatch = useDispatch()
   const productDetail=useSelector(state => state.productDetail)
   const {loading,error,product} = productDetail

    useEffect( ()=>{
        dispatch(listProductDetail(match.params.id))

    },[dispatch,match])

    const addToCartHandler=() =>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }



    return (
            <div>
                <Container className="detailPage" >
            <Row>
                <Col md={6}>
                    <Image id='product-img' src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroupItem className="border-right-0  border-left-0"  > 
                            <h1>{product.name}</h1>
                        </ListGroupItem>
                        <ListGroupItem className="border-right-0  border-left-0"  >
                   
                        </ListGroupItem >
                        <ListGroupItem   className="border-right-0  border-left-0" id='price-pack' >
                            <h2>Price :<b> ₹ {product.price}</b> </h2>
                            <br/>
                            <h3>Pack Size :{product.packsize}</h3>
                        </ListGroupItem>
                        <ListGroupItem   className="border-right-0  border-left-0" id='price-pack' >
                        <Rating value={product.rating} text={' ' +product.numReviews + ' reviews'} />
                        </ListGroupItem>

                        
                    </ListGroup>
                </Col>


                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem className="border-right-0  border-left-0 border-top-0 border-bottom-0">
                                <Row>
                                    <Col><h3>Price</h3></Col>
                                    <Col><strong><h1>₹{product.price}</h1></strong></Col>
                                </Row>
                               
                                <Row id='qty'>
                                    <Col>Status</Col>
                                    <Col>{product.countInStock >0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                              
                                {product.countInStock >0 &&(
                                
                                    <Row  id='qty'>
                                        <Col>Pack Qty:</Col>
                                        <Col>
                                        <FormControl as='select' value={qty} onChange={(e)=>
                                        setQty(e.target.value)}>
                                            {
                                            [...Array(product.countInStock).keys()].map((x) =>(
                                                <option key={x + 1} value={x+1} >
                                                    {x+1}
                                                </option>
                                            ))
                                        }   
                                        </FormControl>  
                                    
                                        
                                        </Col>
                                    </Row>
                             
                            )

                            }
                                <Container fluid id='card-add-btn'>
                                <button onClick={addToCartHandler} type="button" className="btn btn-warning"  disabled={product.countInStock===0}><b>ADD</b> &ensp; <i className='fa fa-shopping-basket' ></i></button></Container>
                            </ListGroupItem>
                           

                        </ListGroup>
                    </Card>
                </Col>
            </Row>    

        </Container>
        <Container>        
            
        <ListGroupItem id='desp' className="border-right-0  border-left-0 border-top-0" >
                           <br/><br/><br/> <h3>About This Product</h3><br/><br/>
                           <p>{product.description}</p>
                        </ListGroupItem>
                        </Container>
                        <Container>        
            
            <ListGroupItem id='desp' className="border-right-0  border-left-0 border-top-0" >
                               <br/><br/><br/> <h3>Benefits of this product</h3><br/><br/>
                               <p>{product.benefits}</p>
                            </ListGroupItem>
                            </Container>

            </div>
    )
}

export default ProductScreen
