import { Component } from "react";
import React from 'react' 
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import HomeScreen from '../screens/HomeScreen'

export default class Main extends Component{
    render(){
        return(
            <>
            <Header />
            <ScrollToTop />
            <Switch>
            <Route path='/' component={HomeScreen} />
            </Switch>
           <Footer/>
            </>
        )
    }


}
