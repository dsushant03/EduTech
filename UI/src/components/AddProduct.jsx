import React from 'react'
import { Input, Container, Button, FormControl, FormLabel, Box, Typography } from '@mui/material'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../contexts/MyContext';

function AddProduct() {
    const[file, setFile] = useState({});
    const[courseName, setCourseName] = useState('');
    const[price, setPrice] = useState('');
    const[author, setAuthor] = useState('');
    const navigate = useNavigate();

    const getFile = (e)=>{
        setFile(e.target.files[0]);
      }

    const {setTab} = useContext(MyContext);

    const addProduct = async ()=>{
      console.log(file)
      const data = {
          courseName,
          author,
          price,
          isPubblished: false
      }
      
      const resp = await axios.put('http://localhost:8080/addProduct',
        {
          image: file,
          data
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }) 

        setTab(0);
    }

    return (
        <>
          <Typography variant='h5' sx={{ml:'44%', mt:'40px'}}>ADD COURSE</Typography>
    
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
    
              <Button sx={{ml:'30px', height:'30px', width:'90px', mt:'60px'}} variant='outlined' 
              onClick={addProduct}>Add</Button>
            </Box>
    
          </Container>
        </>
      )
}

export default AddProduct
