import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { Button, Container, List, ListItem, ListItemText, Divider, Typography,
  Card, CardHeader, CardContent, CardActions, Modal, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar'
import { MyContext } from '../contexts/MyContext';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

function Cart() {

  const [date, setDate] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState('');

  const {cart, setCart} = useContext(MyContext);

  const navigate = useNavigate();
  const placeOrder = async ()=>{

    const productIdArray = cart.map(e=> e._id);

    const res = await axios.post("http://localhost:8080/placeOrder", {
      userId: sessionStorage.user,
      productsId: productIdArray
    })

    setOrderId(res.data.orderId);

    const res2 = await axios.post("http://localhost:8080/clearCart", {
      userId: sessionStorage.user
    })

    setModal(true);
  }

  const deleteItem = async(id)=>{
    const res = await axios.delete(`http://localhost:8080/deleteItem?itemId=${id}`)
    getData();
  }

  const getData = async()=>{
    const res = await axios.post("http://localhost:8080/getCart",{
      userId: sessionStorage.user
    })
    console.log(res.data.cartObjects)
    setCart(res.data.cartObjects);
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDate(currentDate.toLocaleString('en-US', options));

    let price = 0;
    res.data.cartObjects.forEach((e)=>{
      price += e.price
    })
    setTotalPrice(price);
  }

  useEffect(()=>{
    getData();
  }, [])

  return (
    <>
      <NavBar/>
      <Container>
        <Typography variant='h5' textAlign='center' mb='50px' mt='30px'>Cart</Typography>
        <List sx={{mb:'40px'}}>
          {
            cart.map(e=>
                <>
                  <ListItem key={e._id}>
                    <ListItemText sx={{ml:'50px'}}
                      primary={e.courseName}
                      secondary={e.author}
                    />
                    <ListItemText sx={{textAlign:'right', mr:'50px'}}
                      primary={`${e.price}$`}
                    />
                  <RemoveCircleOutlineIcon color='error' sx={{cursor:'pointer'}}
                    onClick={()=>{deleteItem(e._id)}}/>
                  </ListItem>
                  <Divider variant='middle' component='li' />
                </>
              )
          }
        </List>

        <Card variant='outlined' sx={{maxWidth:'40%', ml:'30%' }}>
          <CardHeader
            title="Order Summary"
            subheader={date}
          />

          {
            cart.length === 0 ?
            <>
              <CardContent>
                <Typography>No Items Added Yet</Typography>
              </CardContent>
            </>:
            <>
              <CardContent>
                <Typography> Total Items : {cart.length}</Typography>
                <Typography>Total Price : {totalPrice}$</Typography>
              </CardContent>

              <CardActions>
                <Button variant='outlined' onClick={placeOrder} sx={{mb:'10px'}}>
                  Place Order</Button>
              </CardActions>
            </>
          }
        </Card>
      </Container>
      <Modal
        open={modal}
        onClose={()=>navigate('/products')}>
        <Box sx={{
            position: 'relative',
            width: 400,
            bgcolor: 'white',
            p: 2,
            top: '40%',
            left: '35%'
          }}>
          <Typography sx={{ mt: 2 }}>
            Order placed successfully ..!
          </Typography>
          <Typography>
            Your order Id is {orderId}
          </Typography>
          <Button sx={{mt:'20px', ml:'73%'}} onClick={()=>navigate('/products')}
          variant='outlined' size='small'>Shop more</Button>
        </Box>
      </Modal>
    </>
  )
}

export default Cart
