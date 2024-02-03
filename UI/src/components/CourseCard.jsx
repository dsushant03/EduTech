import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Typography, Button, Card, CardContent, CardMedia } from '@mui/material'
import { useContext } from 'react'
import { MyContext } from '../contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function CourseCard({data, refresh}) {

    const navigate = useNavigate();

    // The cart state must be always in sync with the cart in database
    const {isAdmin, cart, setCart} = useContext(MyContext);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(()=>{
        if(cart)
        {
            setIsAddedToCart(false);
            if(cart.length>0)
            {
                const objectsInCart = cart.map((e)=>e._id)
                if(objectsInCart.includes(data._id))
                {   
                    setIsAddedToCart(true);
                }
            }
            console.log(cart)
        }   
    }, [data, cart]);

    const handlePublish = async(data)=>{

        data.isPublished = !data.isPublished;
        const resp = await axios.put("http://localhost:8080/updateProduct",{
            data
        })
        console.log(resp)
        refresh();
        // console.log(resp)
    }

    const handleAddToCart = async(product, userId)=>{
        // setCartSize(cartSize+1);
        const resp = await axios.post("http://localhost:8080/addToCart",{
            productId: product._id,
            userId
        })
        // console.log(resp)

        setCart(()=>[...cart, product]);
    }

    const handleRemoveFromCart = async(id)=>{
        const res = await axios.delete(`http://localhost:8080/deleteItem?itemId=${id}`)
        setIsAddedToCart(false);

        const newCart = cart.filter((e)=>(e._id != id))
        setCart(newCart);
      }

    const deleteProduct = async()=>{
        const resp = await axios.delete(`http://localhost:8080/deleteProduct?id=${data._id}`);
        refresh();
    }

    const publishText = data.isPublished? 'Un-Publish' : 'Publish';

  return (
    <>
        <Card variant="outlined" sx={{width:'320px'}}>
            <DeleteForeverIcon color='error' fontSize='large' sx={{ml:'88%', mt:'10px', cursor:'pointer'}}
                onClick={deleteProduct}/>
            <CardContent>
                <Box sx={{height:'250px'}}>
                    <CardMedia
                        component="img"
                        height='100%'
                        width='100%'
                        image={`http://localhost:8080/images/${data.image}`}
                        alt="Course logo"
                        sx={{objectFit: 'contain'}}
                    />
                </Box>
                <Typography sx={{ mb: 1.5, mt:'10px' }}>
                    {data.courseName}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    Description :
                </Typography>
                <Typography sx={{ mb: 1.5 }}>
                    A description which gives a good idea about the course, curriculum and how it is going to benefit the student. Also gives some information about the author.
                </Typography>
                <Box sx={{display:'flex', justifyContent:'space-between',
                    mt:'15px'}}>
                    <Box>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Author :
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} >
                            {data.author}
                        </Typography>    
                    </Box>
                    <Box>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                            Price :
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            {data.price}$
                        </Typography>
                    </Box>
                </Box>
                {
                    isAdmin ?
                    <Box sx={{display:'flex', justifyContent:'space-between'}}>
                    <Button variant='outlined' onClick={()=>navigate('/update-product',{
                        state: data
                    })}>
                        Update</Button>
                    <Button variant='outlined'
                        onClick={()=>handlePublish(data)}>{publishText}</Button>
                    </Box> :
                    isAddedToCart ?
                    <Button variant='outlined' sx={{ml:'195px'}} color='error'
                        onClick={()=>handleRemoveFromCart(data._id)}> 
                        Remove</Button>:
                    <Button variant='outlined' sx={{ml:'157px'}} 
                        onClick={()=>handleAddToCart(data, sessionStorage.user)}> 
                        Add to cart</Button> 
                }
            </CardContent>
        </Card>
    </>
  )
}

export default CourseCard
