import { Component } from "react";
import React from 'react' 
import { Switch, Route } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import HomeScreen from '../screens/HomeScreen'
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginPage from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";
import UsersListScreen from '../screens/UsersListScreen'
import UserEditScreen from '../screens/UserEditScreen'
import ProductListScreen from "../screens/ProductListScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import OrderListScreen from "../screens/OrderListScreen";

export default class Main extends Component{
    render(){
        return(
            <>
            <Header />
            <ScrollToTop />
            <Switch>
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/login' component={LoginPage} />
            <Route path='/shipping' component={ShippingScreen}/>
            <Route path='/payment' component={PaymentScreen}/>
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/orders/:id' component={OrderScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/admin/userlist' component={UsersListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
            <Route path='/admin/product/:id/edit' component={ProductEditScreen}/>
            <Route path='/admin/productlist' component={ProductListScreen}/>
            <Route path='/admin/orderlist' component={OrderListScreen}/>
            <Route path='/' component={HomeScreen} />
            </Switch>
           <Footer/>
            </>
        )
    }


}
