import React,{useState} from 'react'
import {Form,Button, FormGroup, FormLabel, FormControl, Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import FormContainter from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {saveShippingAddress } from '../actions/cartActions'


const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} =cart
    const dispatch = useDispatch()
   
    const[address,setAddress]=useState(shippingAddress.address)
    const[city,setCity]=useState(shippingAddress.city)
    const[postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const[country,setCountry]=useState(shippingAddress.country)

const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    history.push('/payment')
}
    return (
    <Container >
           <CheckOutSteps step1 step2 />
        <FormContainter>    
         
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler} id='form'>
            <FormGroup controlId='address' >
                    <FormLabel>Address: </FormLabel>
                    <FormControl type='text' placeholder='Enter Address' value={address}
                    onChange={(e)=>setAddress(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup controlId='city' >
                    <FormLabel>City: </FormLabel>
                    <FormControl type='text' placeholder='Enter city' value={city}
                    onChange={(e)=>setCity(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup controlId='postalCode' >
                    <FormLabel>Postal Code: </FormLabel>
                    <FormControl type='text' placeholder='Enter postalCode' value={postalCode}
                    onChange={(e)=>setPostalCode(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup controlId='country' >
                    <FormLabel>Country: </FormLabel>
                    <FormControl type='text' placeholder='Enter postalCode' value={country}
                    onChange={(e)=>setCountry(e.target.value)}></FormControl>
            </FormGroup>
            <Button type='submit' varient='primary'>
                Contiune
            </Button>


            </Form>
        </FormContainter>
    </Container>
    )
}

export default ShippingScreen
