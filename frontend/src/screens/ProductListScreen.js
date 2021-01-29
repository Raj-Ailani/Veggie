import React, { Component,useState,useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table,Button, Container,Row,Col,Image} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";
import { Message } from "../components/Message";
import {deleteProduct, 
    listProducts,createProduct} from '../actions/productActions'
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({history,match}) => {
    const dispatch = useDispatch()
    const productList =useSelector(state=> state.productList)
    const {loading,error,products} = productList
    

    const userLogin =useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const productDelete=useSelector(state=> state.productDelete)
    const {  loading:loadingDelete,
        error:errorDelete,
        success:successDelete} = productDelete

    const productCreate=useSelector(state=> state.productCreate)
    const {success:successCreate,
    loading:loadingCreate,
    error:errorCreate,
    product:createdProduct} = productCreate


    
    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET})

        if( !userInfo.isAdmin){
            history.push('/login')
        }

        if(successCreate){
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else{
            dispatch(listProducts())
        }
    
    },[dispatch,history,userInfo,successCreate,createdProduct,successDelete] )
    
    const deleteHandler =(id)=>{
       if(window.confirm('Are you sure?')){
     
            dispatch(deleteProduct(id))
           
            
       }
        
    }

    const createProductHandler=()=>{
        dispatch(createProduct())
    }


    return (
    <Container>
    <Row className='align-items-center'>
            <Col>
            <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler} id='form'><i className='fas fa-plus mr-2'></i>Create Product</Button>
             </Col>
        </Row>
        {loadingDelete && <Loader/>}
           {errorDelete && <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>}
           {loadingCreate && <Loader/>}
           {errorCreate && <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>}
       {
            loading ?<Loader /> :error?<Message varient='danger'>{error}</Message>:
            <Table  className=' table-striped table-hover table-responsive ' id='form' >
                <tr id='table-tr'>
                    <th>Image   </th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Count In Stock</th>
                    
                    <th></th>
                </tr>
                <tbody>
                    {products.map((product)=>(
                        <tr key={product._id}>
                            <td>  <Image src={product.image} alt={product.name} fluid rounded id='product-list-image'/></td>
                        
                            <td>{product.name}</td> 
                           
                            <td>
                                {product.price
                                }
                            </td>
                            <td>
                          {product.category}
                            </td>
                            <td>
                          {product.countInStock}
                            </td>


                            <td>
                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button varient='danger' className='btn-sm' onClick={()=>deleteHandler(product._id)}>
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

export default ProductListScreen
