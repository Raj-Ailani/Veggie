import React from 'react'
import { Card,CardBody,CardImg, CardText, CardTitle } from 'reactstrap'
import products from './product'
const ProductCard = () => {
    return (
        <div>
            <Card className="my-3 p-3 rounded card-item">
                <CardImg src={products.image} />
                <CardBody>
                
                    <CardTitle as="div"><strong>
                        Try</strong>
                    </CardTitle>
              
         
                <CardText as='h3'>
               <strong> {products.price}</strong>
                </CardText>
            </CardBody>
            </Card>
        </div>
    )
}

export default ProductCard
