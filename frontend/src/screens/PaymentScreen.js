import React, { useState,useEffect } from 'react'

import {Form,Button, FormGroup, FormLabel, FormControl, Container,Col, FormCheck} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainter from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePaymentMethod } from '../actions/cartActions'
import { Alert } from 'reactstrap'


const PaymentScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} =cart
    
    const dispatch = useDispatch()

    if(!shippingAddress){
        history.push('/shipping')
    }
    
    const[paymentMethod,setPaymentMethod]=useState('PayPal')
    

const submitHandler=(e)=>{

    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    console.log(paymentMethod)
    history.push('/placeorder')
}
    return (
    <Container >
           <CheckOutSteps step1 step2 step3/>
        <FormContainter>    
         
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler} id='form'>
                <FormGroup>
                    <FormLabel as='legend'>Select Method</FormLabel>
                </FormGroup>
                <Col>
                    <FormCheck type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' 
                    onChange={(e)=> setPaymentMethod(e.target.value)}>  
                    </FormCheck>
                    <FormCheck type='radio' label='Cash On Delivery(COD)' id='COD' name='paymentMethod' value='COD'  
                    onChange={(e)=> setPaymentMethod(e.target.value)}>  
                    </FormCheck>
                    

                </Col>
               
                <Button type='submit' varient='primary'>
                Contiune
                </Button>
            </Form>
        </FormContainter>
    </Container>
    )
}

export default PaymentScreen
