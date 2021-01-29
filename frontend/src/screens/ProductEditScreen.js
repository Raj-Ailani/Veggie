import axios from 'axios'
import React, { Component,useState,useEffect } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {Form,Button,Row,Col, FormGroup, FormLabel, FormControl, Container,  FormCheck} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { Loader } from "../components/Loader";
 import {listProductDetail,updateProduct} from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';





const ProductEditScreen = ({match,history}) =>  {
    const productId=match.params.id


    const [price,setPrice]=useState(0)
    const [name,setName]=useState('')
    const [image,setImage]= useState('') 
    const [category,setCategory]=useState(null)
    const [countInStock,setCountInStock]= useState('') 
    const [benefits,setBenefits]= useState('') 
    const[description,setDescription]= useState('') 
    const[packsize,setPackSize]=useState('')
    const[uploading,setUploading]=useState(false)



    const dispatch = useDispatch()

    const productDetail = useSelector((state) => state.productDetail)
    const {loading,error,product} =productDetail


    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading:loadingUpdate
        ,error:errorUpdate
        ,success:successUpdate} =productUpdate


    useEffect(()=>{
            if(successUpdate){
                dispatch({type:PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            }else{
                if(!product.name || product._id !==productId){
                    dispatch(listProductDetail(productId))
                }else{
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setBenefits(product.benefits)
                    setDescription(product.description)
                    setPackSize(product.packsize)                
                }
            }
            
        


     
       
    },[dispatch,productId,product,history,successUpdate ])

    const submitHandler =(e)=>{
       
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            category,
            description,
            benefits,
            countInStock,
            packsize,
            image,
        }))
    }   


    const uploadFileHandler= async(e) =>{
        const file=e.target.files[0]
        const formData=new FormData()
        
        formData.append('image',file)
        setUploading(true)

        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }    

            const {data}= await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)

        } catch (error) {
            console.log(error)
            setUploading(false)
        }

    }



    return (
        <>
        
     
        <Container className='cartPage'>
        <Link to='/admin/productlist' className='btn btn-light my-3' id='go-back-btn'>Go Back
        </Link>
       <FormContainer>
           <h1>Edit Product</h1>
           {loadingUpdate && <Loader/>}
           {errorUpdate && <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>}
           {loading ? <Loader /> : error ? <div class="alert alert-danger" role="alert" id='wrong'>{error}</div>:
            <Form onSubmit={submitHandler}  id='form'>



            <FormGroup controlId='name' >
                <FormLabel>Name: </FormLabel>
                <FormControl  type='name' placeholder='Enter Name' value={name}
                onChange={(e)=>setName(e.target.value)}></FormControl>
            </FormGroup>




            <FormGroup controlId='price' >
                <FormLabel>Price: </FormLabel>
                <FormControl type='price' placeholder='Enter Price' value={price}
                onChange={(e)=>setPrice(e.target.value)}></FormControl>
            </FormGroup>

             
            <FormGroup controlId='image' >
                <FormLabel>Image URL: </FormLabel>
                <FormControl type='text' placeholder='Image URL' value={image}
                onChange={(e)=>setImage(e.target.value)}></FormControl>

                <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                {uploading &&<Loader/>}
            </FormGroup>



                       
            <FormGroup controlId='category' >
                <FormLabel>Category: </FormLabel>
                <FormControl type='category' placeholder='Enter Name' value={category}
                onChange={(e)=>setCategory(e.target.value)}></FormControl>
            </FormGroup>

                       
            <FormGroup controlId='description' >
                <FormLabel>Description Of Product: </FormLabel>
                <textarea id='big-box' type='description' placeholder='Enter Description' value={description}
                onChange={(e)=>setDescription(e.target.value)}></textarea>
            </FormGroup>


                       
            <FormGroup controlId='benefits' >
                <FormLabel>Benefits of Product </FormLabel>
                <textarea    id='big-box' type='benfits' placeholder='Enter Name' value={benefits}
                onChange={(e)=>setBenefits(e.target.value)}></textarea>
            </FormGroup>

                       

            <FormGroup controlId='packsize' >
                <FormLabel>Pack Size: </FormLabel>
                <FormControl type='packsize' placeholder='Enter Pack Size' value={packsize}
                onChange={(e)=>setPackSize(e.target.value)}></FormControl>
            </FormGroup>
                       


            <FormGroup controlId='countInStock' >
                <FormLabel>Count In Stock: </FormLabel>
                <FormControl type='countInStock' placeholder='Enter Stock' value={countInStock}
                onChange={(e)=>setCountInStock(e.target.value)}></FormControl>
            </FormGroup>

  
          
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

export default ProductEditScreen
