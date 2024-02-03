import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Container, Grid, Fab, Box, Typography} from '@mui/material';
import CourseCard from './CourseCard';

function Products() {

  const limitPerPage = 3;
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const getData = async()=>{
    const resp = await axios.get(`http://localhost:8080/getProducts?limitPerPage=${limitPerPage}&currentPage=${currentPage}&role=${sessionStorage.role}`);
    setData(resp?.data.products);
    setTotal(resp?.data.totalProducts);
    setPages(Array(Math.ceil(resp.data.totalProducts/limitPerPage)).fill(0));
    setStart(1+(currentPage-1)*limitPerPage);
    setEnd((currentPage-1)*limitPerPage + resp.data.products.length);
  }

  useEffect(()=>{
    getData();
  }, [currentPage])


  return (
    <>
        <Container>
            <Typography variant='h6' sx={{color:'blue', mt:'20px'}} >
                Showing {start}-{end} of total {total} results
            </Typography>
            <Grid container spacing={1} sx={{mt:'20px'}}>
                {
                    data?.map((e, i)=>(
                        <Grid item lg={4} md={6} xs={12} key={i}>
                            <CourseCard refresh={getData} data={e}/>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
        
        <Box sx={{position:'fixed', bottom:'50px', right:'100px'}}>
            {
                pages.map((e, i)=>(
                    <Fab size='small' color='primary' sx={{ml:'10px'}} 
                        onClick={()=>setCurrentPage(i+1)}
                        key={i}>{i+1}</Fab>
                ))            
            }
        </Box>

    </>
  )
}

export default Products
