import React from 'react'
import {Link} from 'react-router-dom'
import { Card,CardBody,CardImg, CardText, CardTitle } from 'reactstrap'
import Rating from './Rating'

const ProductCard = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded card-item">
        <Link to={`/product/`+product._id}>
            <CardImg src={product.image}  />
        </Link>
        <CardBody>
            <Link to={`/product/`+product._id}  style={{ textDecoration: 'none' }}>
                <CardTitle as="div" id='product-name'><strong>
                   <b> {product.name}</b></strong>
                </CardTitle>
            </Link>
            <CardText as='h3' id='product-price'>
           <strong><br/> ₹{product.price}</strong>
            </CardText>
            <CardText as='h4' id='product-price'>
           <strong> Pack Size:{product.packsize}</strong>
            </CardText>
            <CardText as="div">
                    <Rating value={product.rating} text={' ' +product.numReviews + ' reviews'} />
                </CardText>
        </CardBody>
    </Card>
    )
}

export default ProductCard
