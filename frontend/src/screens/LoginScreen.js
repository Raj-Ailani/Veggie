import React, {useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";

import {login} from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const LoginScreen = ({location,history}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    

    const redirect =   location.search ? location.search.split('=')[1] :'/'

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading,error,userInfo} =userLogin

    
    useEffect(()=>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])


    const submitHandler =(e)=>{
       
        e.preventDefault()
    
        dispatch(login(email,password))
    }   


    return (
        <FormContainer>
        <h1>Sign In</h1>
        
         {loading && <Loader />}
         <Form onSubmit={submitHandler} id='form'> 
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

             <Button type='submit' varient='primary'>
                 Sign In
             </Button>
             

         </Form>
 {error &&   <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>} 
       
         <Row className='py-3' id='register-link'>
             <Col>
             New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>Register Here</Link>
             </Col>
         </Row>
    </FormContainer>
    )
}

export default LoginScreen
