import React from 'react'
import { Card, Col, Container, ListGroup, Row } from 'reactstrap'
import {Image, FormControl,ListGroupItem} from 'react-bootstrap'
import products from '../product'

const ProductScreen = ({match}) => {
   const product = products.find((p)=> p._id===match.params.id)
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
                            <h3>Pack Size :500gm</h3>
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
                                <ListGroupItem className="border-right-0  border-left-0 border-top-0">
                                    <Row>
                                        <Col>Pack Qty:</Col>
                                        <Col>
                                        <option></option>
                                    
                                        
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <Container fluid id='card-add-btn'>
                                <button type="button" className="btn btn-warning"><b>ADD</b> &ensp; <i className='fa fa-shopping-basket'></i></button></Container>
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
