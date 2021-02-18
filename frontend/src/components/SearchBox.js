import React,{useState} from 'react'
import {Form,Button, Container} from 'react-bootstrap'


const SearchBox = ({history}) => {
    const[keyword,setKeyword]=useState('')


    const submitHandler= (e)=>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }
        else{
            history.push('/')
        }
    }


    return (
        <Form onSubmit={submitHandler} inline id='search'>
          
            <Form.Control type='text' name='q' onChange={(e)=>setKeyword(e.target.value)} placeholder='Search Products...' className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' varient='outline-success' className='p-2 fas fa-search'></Button>
            
        </Form>

    )
}

export default SearchBox
