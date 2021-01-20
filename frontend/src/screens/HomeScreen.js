import React from 'react'
import Caro from '../components/Carousel'
import Advertisment from '../components/Advertisment'
import Swipe from '../components/Swipe'
import { Container,Row,Col } from 'reactstrap'
import product from '../product'
import ProductCard from '../components/ProductCard'


function HomeScreen() {
    return (
        <div>
            <Caro></Caro>
            <Advertisment></Advertisment>
            <Container id='featured-product'>
            <h2>Featured Products</h2>
            <Swipe />
            </Container>
            <Container id='all-product'>
                
            <h2>All Products</h2>
            <Row>
                    {product.map(product => (
                       <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        <ProductCard product={product}/>
                       </Col> 
                    ))
                    }
                </Row>
            </Container>

            
           
        </div>
    )
}

export default HomeScreen
