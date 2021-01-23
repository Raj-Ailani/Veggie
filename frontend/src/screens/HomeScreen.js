import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import Caro from '../components/Carousel'
import Advertisment from '../components/Advertisment'
import Swipe from '../components/Swipe'
import { Container,Row,Col } from 'reactstrap'
import {listProducts} from '../actions/productActions'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
 

function HomeScreen() {
    const dispatch = useDispatch()
   const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList


    useEffect( ()=>{
        dispatch(listProducts())
    },[dispatch])

    

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
          
          
            <Row>{ loading ? <Loader/> : 
                products.map((product) => (
                   <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                    <ProductCard product={product}/>
                   </Col> 
                ))  
                
            
            }</Row>
            </Container>

            
           
        </div>

      
    )
}

export default HomeScreen
