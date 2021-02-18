import React from 'react'
import {Nav, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import { } from 'react-router-dom'
const CheckOutSteps = ({step1,step2,step3,step4}) => {
    return (
       <Nav className='justify-content-center mb-4 bb-4'    >
           <NavItem >
           {
               step1?(
                    <LinkContainer to="/login">
                        <Nav.Link className='navlinks'>Sign In</Nav.Link>
                    </LinkContainer>
               ) :   <Nav.Link disabled>Sign In</Nav.Link>
             
           }
           </NavItem>
           <NavItem>
           {
               step2?(
                    <LinkContainer to="/shipping">
                        <Nav.Link className='navlinks'>Shipping</Nav.Link>
                    </LinkContainer>
               ) :    <Nav.Link disabled>Shipping</Nav.Link>
             
           }
           </NavItem>
           <NavItem>
           {
               step3?(
                    <LinkContainer to="/payment">
                        <Nav.Link className='navlinks'>Payment</Nav.Link>
                    </LinkContainer>
               ) :    <Nav.Link disabled>Payment</Nav.Link>
             
           }
           </NavItem>
           <NavItem>
           {
               step4?(
                    <LinkContainer to="/placeorder">
                        <Nav.Link className='navlinks'>Place Order</Nav.Link>
                    </LinkContainer>
               ) :    <Nav.Link disabled>Place Order</Nav.Link>
             
           }
           </NavItem>
       </Nav>
           
    )
}

export default CheckOutSteps
