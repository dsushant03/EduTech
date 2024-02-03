import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Input, Container, Button, FormControl, FormLabel, Box, Typography } from '@mui/material'
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateProduct() {
  
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  
  const[file, setFile] = useState({});
  const[courseName, setCourseName] = useState(data.courseName);
  const[price, setPrice] = useState(data.price);
  const[author, setAuthor] = useState(data.author);

  const getFile = (e)=>{
    setFile(e.target.files[0]);
  }

  const updateProduct = async ()=>{
    data.courseName = courseName;
    data.author = author;
    data.price = price;
    
    const resp = await axios.put('http://localhost:8080/updateProduct',
      {
        image: file,
        data
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }) 

      navigate('/admin-dashboard')
  }

  return (
    <>
      <Navbar/>

      <Typography variant='h5' sx={{ml:'47%', mt:'40px'}}>UPDATE</Typography>

      <Container sx={{width: '50%', border:'1px solid black', p:'30px', mt:'50px'}}>
        <FormControl fullWidth>
          <FormLabel>Course Name</FormLabel>
          <Input type="text"  value={courseName}
            onChange={(e)=>setCourseName(e.target.value)}/>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: '20px' }}>
          <FormLabel>Author</FormLabel>
          <Input type="text"  value={author}
            onChange={(e)=>setAuthor(e.target.value)}/>
        </FormControl>

        <FormControl fullWidth sx={{ marginTop: '20px' }}>
          <FormLabel>Price</FormLabel>
          <Input type="text"  value={price}
            onChange={(e)=>setPrice(e.target.value)}/>
        </FormControl>

        <Box sx={{display:'flex'}}>
          <FormControl fullWidth sx={{ marginTop: '20px' }}>
            <FormLabel>Image</FormLabel>
            <Input sx={{mt:'30px', width:'50%'}} type='file' onChange={getFile}></Input>
          </FormControl>

          <Button sx={{ml:'30px', height:'30px', width:'90px', mt:'60px'}} variant='outlined' onClick={updateProduct}>Update</Button>
        </Box>

      </Container>
    </>
  )
}

export default UpdateProduct
