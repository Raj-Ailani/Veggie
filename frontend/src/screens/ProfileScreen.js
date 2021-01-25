import React, { Component,useState,useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl, Container,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";
import { Message } from '../components/Message';
import {getUserDetail,updateUserProfile} from '../actions/userActions'
import { listMyOrder} from '../actions/orderActions';

const ProfileScreen = ({location,history}) =>  {
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfimPassword]=useState('')
    const [message,setMessage]=useState(null)
    const [empty,setEmpty] = useState(true)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading,error,user} =userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} =userLogin

    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success } =userUpdateProfile


    
    const orderListMy = useSelector(state => state.orderList)
    const {order,loading:loadingOrders,error:errorOrders } =orderListMy


    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else{
            if(!user.name){
                dispatch(getUserDetail('profile'))
                dispatch(listMyOrder())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
            if(order){
                setEmpty(false)
            }
        }
    },[dispatch,history,userInfo,user,order])

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
                    {empty ?<Message varient='danger'>No Orders Found</Message> :loadingOrders ? <Loader /> :errorOrders? <Message varient='danger'>{errorOrders}</Message>:
            <Table className=' table-striped table-hover table-responsive ' id='form2'>
              
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                        <th></th>
                    </tr>
              
                <tbody>
                    {order.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>₹{order.totalPrice}</td>
                            <td>{!order.isPaid?  (
                                <i className='fas fa-times' style={{color:'red'}}></i>
                            ):<i className='fas fa-check' style={{color:'lightgreen'}}></i>}</td>
                             <td>{order.isDelivered? order.isDelivered.substring(0,10): (
                                <i className='fas fa-times' style={{color:'red'}}></i>
                            )}</td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                    <Button type="button"  className='btn btn-primary btn-sm'>
                                        Details
                                    </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            
            }
                </Col>
            </Row>
            </Container>
        )
}


export default ProfileScreen
