import React, { Component,useState,useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button, Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import {listOrders} from '../actions/orderActions'


const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()
    const allOrderList =useSelector(state=> state.allOrderList)
    const {loading,error,orders} = allOrderList
    

    const userLogin =useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
        }else{
            history.push('/login')
        } 
    
    },[dispatch,history,userInfo] )
    
  

    return (
        <Container className='user-list'>
        
        <h1>Orders</h1>{
            loading ?<Loader /> :error?<Message varient='danger'>{error}</Message>:
            <Table  className=' table-striped table-hover table-responsive ' id='form'>
                <tr id='table-tr'>
                    <th>ID</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Total Price</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th></th>
                </tr>
                <tbody>
                    {orders && orders.map((order)=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user && order.user.name}</td> 
                           
                            <td>
                            {order.createdAt.substring(0,10)}
                            </td>
                            <td>₹
                            {order.totalPrice}
                            </td>
                            <td>
                            {order.isPaid ? <i className='fas fa-check' style={{color:'green'}}></i>:
                                <i className='fas fa-times' style={{color:'red'}} />
                                }
                            </td>
                            <td>
                            {order.isDelivered ? <i className='fas fa-check' style={{color:'green'}}></i>:
                                <i className='fas fa-times' style={{color:'red'}} />
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/orders/${order._id}`}>
                                    <Button variant='light' className='btn-sm'>
                                       Details
                                    </Button>
                                </LinkContainer>
                               
                            </td>
                        </tr>
                    ))

                    }


                </tbody>
            </Table>
        }
            
        </Container>
    )
}

export default OrderListScreen
