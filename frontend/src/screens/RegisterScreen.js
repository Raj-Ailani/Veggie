import React, { useState,useEffect } from 'react'
import {Link, } from 'react-router-dom'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl, Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";

import {register} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({location,history}) =>  {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfimPassword]=useState('')
    const [message,setMessage]=useState(null)
    const redirect =   location.search ? location.search.split('=')[1] :'/'

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading,error,userInfo} =userRegister


    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler =(e)=>{
       
        e.preventDefault()
        if(password !==confirmpassword){
            setMessage('Password do not match')
        }else{
        dispatch(register(name,email,password))}
    }   


    return (
        <Container className='cartPage'>
       <FormContainer>
           <h1>Register</h1>
            {error && <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>}
         
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
                  Register
                </Button>

            </Form>
    
            <Row className='py-3' id='register-link'>
                <Col>
               Have An Account? <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}>LogIn</Link>
                </Col>
            </Row>
       </FormContainer>
       </Container>
    )
}

export default RegisterScreen
