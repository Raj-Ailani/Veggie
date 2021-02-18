import React, { useEffect } from 'react'

import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button, Container} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";

import {listUser,deleteUser} from '../actions/userActions'


const UsersListScreen = ({history}) => {
    const dispatch = useDispatch()
    const userList =useSelector(state=> state.userList)
    const {loading,error,users} = userList
    

    const userLogin =useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete =useSelector(state=> state.userDelete)
    const {success:successDelete} = userDelete


    
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
        dispatch(listUser())
        }else{
            history.push('/login')
        } 
    
    },[dispatch,history,successDelete,userInfo] )
    
    const deleteHandler =(id)=>{
       if(window.confirm('Are you sure?')){
        dispatch(deleteUser(id))
       }
        
    }


    return (
        <Container className='user-list'>
        
        <h1>Users</h1>{
            loading ?<Loader /> :error? <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>:
            <Table  className=' table-striped table-hover table-responsive ' id='form'>
                <tr id='table-tr'>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th></th>
                </tr>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td> 
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin?<i className='fas fa-check' style={{color:'green'}}></i>:
                                <i className='fas fa-times' style={{color:'red'}} />
                                }
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button varient='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>
                                    <i className='fas fa-trash '></i>
                                </Button>
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

export default UsersListScreen
