import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Card,CardBody,CardImg, CardText, CardTitle } from 'reactstrap'
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { Container } from 'reactstrap';
import ProductCard from './ProductCard'
import products from '../components/product'

SwiperCore.use([Navigation, Pagination]);

const Swipe = () => {
    return (
        <div >
       {
   <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')
    }
    breakpoints={
      {
        
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }
    }
    >
      {
        products.map(product => (
          <SwiperSlide>
             <Card className="my-3 p-3 rounded card-item">
                <CardImg src={product.image} id='cardimg' />
                <CardBody>
                
                    <CardTitle as="div"><strong>
                        {product.name}</strong>
                    </CardTitle>
              
         
                <CardText as='h3'>
               <strong> {product.price}</strong>
                </CardText>
            </CardBody>
            </Card>
          </SwiperSlide>
        ))
      }
     


    </Swiper>
 }
        </div>
    )
}

export default Swipe
