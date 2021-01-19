import React, { Component ,useS, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Nav,Navbar,NavbarBrand,NavbarToggler,Collapse, Container, NavItem} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

const Header = (props) =>{
    return(
        <div id='header'>
        <Navbar dark id="navbar" expand="md">
      
            <NavbarBrand>
                <Container id="logo-con" className="mr-auto"> 
                    <NavLink to="/home">
                        <img src="/assets/logo.png" alt="logo" className="logo"></img>
                    </NavLink>
                </Container>
            </NavbarBrand>

       
        </Navbar>
    </div>
    )
}

export default Header