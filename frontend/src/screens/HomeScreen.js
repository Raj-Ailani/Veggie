import React from 'react'
import Caro from '../components/Carousel'
import Advertisment from '../components/Advertisment'
import Swipe from '../components/Swipe'
import { Container,Row,Col } from 'reactstrap'
import ProductCard from '../components/ProductCard'



function HomeScreen() {
    return (
        <div>
            <Caro></Caro>
            <Advertisment></Advertisment>
            <Container id='featured-product'>
            <h2>Featured Products</h2>
            <Swipe></Swipe>
            </Container>
            
            
           
        </div>
    )
}

export default HomeScreen
