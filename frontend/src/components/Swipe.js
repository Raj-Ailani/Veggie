import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Carousel from 'react-multi-carousel';


import { Card,CardBody,CardImg, CardText, CardTitle } from 'reactstrap'

import { Container } from 'reactstrap';





const Swipe = () => {
  const [products,setProduct]=useState([])


  useEffect(() => {
    const fetchProducts= async()=>{
      const{data } = await axios.get('/api/products')
    setProduct(data)
    }
    fetchProducts()
  },[])


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  
    return (
        <div >
       
   
        <Carousel responsive={responsive}>
       { products.map(product => (
          
            
            <Link nk to={`/product/`+product._id}  style={{ textDecoration: 'none' }}>
             <Card className="my-3 p-3 rounded card-item" id='product-card'>
               <div id='card-img'>
                  <CardImg src={product.image} id='cardimg' />
                  </div>
   
                <CardBody>
                
                    <CardTitle as="div" id='card-name'><strong>
                      <b>  {product.name}</b></strong>
                    </CardTitle>
              
         
                <CardText as='h3' id='card-price'>
               <a id='mrp'> MRP</a><strong><b> {product.price}</b></strong>
                </CardText>
                <Container fluid id='card-add-btn'>
                <button type="button" class="btn btn-warning"><b>ADD</b> &ensp; <i className='fa fa-shopping-basket'></i></button></Container>
            </CardBody>
            </Card>
            </Link>
           
       ))
       }
        </Carousel>
     



 
        </div>
    )
}

export default Swipe
