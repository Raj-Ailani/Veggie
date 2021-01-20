import React, { Component ,useS, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Nav,Navbar,NavbarBrand,NavbarToggler,Collapse, Container,Col, NavItem, Button} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';


import { LinkContainer } from 'react-router-bootstrap';

const Header = (props) =>{
    const [isNavOpen,toggleNav] = useState(false)
      
    return(
        <div id='header'>
            <Navbar id='navbar' expand='md'>
            <NavbarToggler onClick={()=>toggleNav(!isNavOpen)}><i className="fa fa-bars" id='bars'></i></NavbarToggler>
           
                <Container id='logo-cont' className='mr-auto'>
                            <NavLink to="/home">
                                <img src="/assets/logo.png" alt="logo" className="logo"></img>
                            </NavLink>
                 </Container>


                 <Collapse isOpen={isNavOpen} navbar>
                     <Nav id='nav-items' className='ml-auto'><NavItem >
                        <NavLink className="nav-item" to="/cart"> Basket &ensp;<i className="fa fa-shopping-basket" /></NavLink>
                        </NavItem>
                        <NavItem >
                        <NavLink className="nav-item" to="/cart"> Sign In &ensp;<i className="fa fa-user" /></NavLink>
                        </NavItem>
                        </Nav>
               </Collapse>

                
                 
            
            </Navbar>    
         </div>
    )
}

export default Header