import React, { Component,useState,useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl, Container,  FormCheck} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";

import {getUserDetail,updateUser} from '../actions/userActions'
import {USER_UPDATE_RESET} from '../constants/userContants'
import FormContainer from '../components/FormContainer'

const UserEditScreen = ({match,history}) =>  {


    const userId=match.params.id
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [isAdmin,setIsAdmin]= useState('') 
    const [message,setMessage]=useState(null)
   

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const {loading,error,user} =userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {loading:loadingUpdate,
        error:errorUpdate,
        success:successUpdate} =userUpdate

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !==userId){
                dispatch(getUserDetail(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


     
       
    },[dispatch,userId,successUpdate,user,history])

    const submitHandler =(e)=>{
       
        e.preventDefault()
       dispatch(updateUser({_id:userId,name,email,isAdmin}))
    }   


    return (
        <>
        
     
        <Container className='cartPage'>
        <Link to='/admin/userlist' className='btn btn-light my-3' id='go-back-btn'>Go Back
        </Link>
       <FormContainer>
           <h1>Edit User</h1>
           {loadingUpdate && <Loader/>}
           {errorUpdate && <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>}
           {loading ? <Loader /> : error ? <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>:
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

            <FormGroup controlId='isAdmin' >
               
                <FormCheck type='checkbox' label='Is Admin'  checked={isAdmin}

                onChange={(e)=>setIsAdmin(e.target.checked)}></FormCheck>
            </FormGroup>

  
            {message &&  <div class="alert alert-danger" role="alert" id='wrong'>{message}</div>}
            <Button type='submit' varient='primary'>
              Update    
            </Button>

        </Form>

           }
           
           
       </FormContainer>
       </Container>
        </>
        
        
    )
}

export default UserEditScreen
