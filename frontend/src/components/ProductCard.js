import React from 'react'
import {Link} from 'react-router-dom'
import { Card,CardBody,CardImg, CardText, CardTitle } from 'reactstrap'

const ProductCard = ({product}) => {
    return (
        <Card className="my-3 p-3 rounded card-item">
        <Link to={`/product/`+product._id}>
            <CardImg src={product.image}  />
        </Link>
        <CardBody>
            <Link to={`/product/`+product._id}>
                <CardTitle as="div"><strong>
                    {product.name}</strong>
                </CardTitle>
            </Link>
            <CardText as='h3'>
           <strong> ₹{product.price}</strong>
            </CardText>
        </CardBody>
    </Card>
    )
}

export default ProductCard
