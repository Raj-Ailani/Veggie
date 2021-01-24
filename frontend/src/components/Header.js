import React, { Component ,useS, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Nav,Navbar,NavbarBrand,NavbarToggler,Collapse, Container,Col, NavItem, Button} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import {logout} from '../actions/userActions'

import { LinkContainer } from 'react-router-bootstrap';

const Header = (props) =>{
    const dispatch = useDispatch( )
    const [isNavOpen,toggleNav] = useState(false)
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler =() =>{
        dispatch(logout())
       
    }
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
                        {userInfo?(
                           <NavDropdown as='link' title={userInfo.name} id='nav-real'>
                             
                           <LinkContainer to='/profile'>
                           <NavDropdown.Item>
                             Profile  
                           </NavDropdown.Item>
                           </LinkContainer>
                           {userInfo && userInfo.isAdmin &&(
                               <div>
                                   <LinkContainer to='/admin/userlist'>
                                   <NavDropdown.Item>
                                   User List  
                                   </NavDropdown.Item>
                                   </LinkContainer>
                                   <LinkContainer to='/admin/productlist'>
                                   <NavDropdown.Item>
                                   Product List  
                                   </NavDropdown.Item>
                                   </LinkContainer>
                                   <LinkContainer to='/admin/orderlist'>
                                   <NavDropdown.Item>
                                   Orders List  
                                   </NavDropdown.Item>
                                   </LinkContainer>
                               </div>
                           )

                           }
                      
                       
                           <NavDropdown.Item  onClick={logoutHandler}>
                               Logout
                           </NavDropdown.Item>
                       
                   </NavDropdown>
                        


                        ):
                                 <NavItem >
                                 <NavLink className="nav-item" to="/login"> Sign In &ensp;<i className="fa fa-user" /></NavLink>
                                 </NavItem>

                    }
                   
                        </Nav>
               </Collapse>

                
                 
            
            </Navbar>    
         </div>
    )
}

export default Header