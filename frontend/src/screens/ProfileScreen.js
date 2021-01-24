import React, { Component,useState,useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl, Container, Alert} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";

import {getUserDetail,updateUserProfile} from '../actions/userActions'


const ProfileScreen = ({location,history}) =>  {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfimPassword]=useState('')
    const [message,setMessage]=useState(null)
 

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} =userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success } =userUpdateProfile


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetail('profile'))
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[dispatch,history,userInfo,user])

    const submitHandler =(e)=>{
       
        e.preventDefault()
        if(password !==confirmpassword){
            setMessage('Password do not match')
        }else{
            dispatch(updateUserProfile({id:user._id,name,email,password}))
    }  
} 


    return (
        <Container>
            <Row>
                <Col md={3}>
                <h2>User Profile</h2>
            {error && <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>}
            {success && <div class="alert alert-success" role="alert" id='wrong'>Profile Updated  </div>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}  id='form'>
                <FormGroup controlId='name' >
                    <FormLabel>Name: </FormLabel>
                    <FormControl type='name' placeholder='Enter Name' value={name}
                    onChange={(e)=>setName(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId='email' >
                    <FormLabel>Email: </FormLabel>
                    <FormControl type='email' placeholder='Enter Email' value={email}
                    onChange={(e)=>setEmail(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='password' >
                    <FormLabel>Password: </FormLabel>
                    <FormControl type='password' placeholder='Enter Password' value={password}
                    onChange={(e)=>setPassword(e.target.value)}></FormControl>
                </FormGroup>

                <FormGroup controlId='password' >
                    <FormLabel>Confirm Password: </FormLabel>
                    <FormControl type='password' placeholder='Enter Password' value={confirmpassword}
                    onChange={(e)=>setConfimPassword(e.target.value)}></FormControl>
                </FormGroup>
                {message &&  <div class="alert alert-danger" role="alert" id='wrong'>{message}</div>}
                <Button type='submit' varient='primary'>
                  Update
                    </Button>

            </Form>
    
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
            </Container>
        )
}


export default ProfileScreen
