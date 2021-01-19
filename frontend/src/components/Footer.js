import React, { Component ,useS, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Nav,Navbar,NavbarBrand,NavbarToggler,Collapse, Container, NavItem} from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

const Footer = (props) =>{
    return(
            <div id='footer'>
               <div className="container fluid" >
            <div className="row justify-content-center" id='footer-cont'>             
                <div className="col-4 offset-1 col-sm-2">
                    <h5>Links</h5>
                    <ul className="list-unstyled">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/about">AboutUs</Link></li>
                       <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="col-7 col-sm-5">
                    <h5>Our Address</h5>
                    <address>Shop No-3,Ground Floor,Satyam Complex
		              <br />Opp. Balaji Garden Resturant,Near Prenatirth Road ,Jodhpur Gam
		             <br />Satelite,Ahmedabad-15
		             
                      </address>
                      <br/>
		              <i className="fa fa-phone fa-lg"></i>:+91 8866091788<br />
		              
		              <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:confusion@food.net">
                         Mail</a>
                   
                </div>
          
            </div>
            <div className="row justify-content-center">             
                <div className="col-auto">
                <br/>  <p>© Copyright 2020 VEGGIE</p>
                </div>
            </div>
        </div>
            </div>
    )
}

export default Footer