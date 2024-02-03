import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { Container, Table, TableContainer, TableBody, TableRow, TableCell, Paper, TableHead, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function UserProfile() {

  const getDate = (dateString)=>{
    const dateObject = new Date(dateString);

    const formattedDate = dateObject.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "IST"
    });

    return formattedDate;
  }

  const getAmount = (products)=>{
    let sum = 0;

    products.forEach((e)=>{
      sum += e.price;
    })

    return sum;
  }

  const [respData, setRespData] = useState([]);

  useEffect(()=>{
    const getOrders = async()=>{
        const resp = await axios.post('http://localhost:8080/getOrders',{
            userId: sessionStorage.user
        });
        setRespData(resp.data);
    }
    getOrders();
  }, [])

  return (
    <>
      <Navbar/>
      <Container sx={{mt: '30px'}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography>Your Previous Orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell align='justify'>Sr. No.</TableCell>
                <TableCell align='justify'>Date</TableCell>
                <TableCell >Products</TableCell>
                <TableCell >Amount Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {respData.map((row, index) => (
                <TableRow key={index} >
                  <TableCell align='justify' component="th" scope="row">
                    {index+1}
                  </TableCell>
                  <TableCell align='justify'>{getDate(row.Orders.orderDate)}</TableCell>
                  <TableCell align='justify'>
                    {
                      <TableBody >
                        {
                          row.Products.map((product, index)=>(
                            <TableRow key={index} sx={{width:'400px'}}>
                              <TableCell align='justify'>{product.courseName}</TableCell>
                              <TableCell align='justify'>{product.price}$</TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    }
                  </TableCell>
                  <TableCell align='justify'>{getAmount(row.Products)}$</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </AccordionDetails>
      </Accordion>
        {/* <Typography></Typography> */}
       
      </Container>
    </>
  )
}

export default UserProfile
