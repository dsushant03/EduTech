import React, { useState, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import {Alert, FormControl, Typography, FormLabel, Input, Button, Paper, Box} from '@mui/material'
import axios from 'axios';
import { MyContext } from '../contexts/MyContext';

function Login() { 
  const navigate = useNavigate();
  const {setLoggedIn, setIsAdmin} = useContext(MyContext);

  const handleSubmit = async()=>{
    
    try
    {
      const res = await axios.post("http://localhost:8080/login",{
        username,
        password
      })
      
      if(res.data?.success)
      {
        // console.log(res)
        setMessage(null);
        sessionStorage.setItem('user', res.data.id);
        sessionStorage.setItem('role', res.data.role);
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('refreshToken', res.data.refreshToken);
        sessionStorage.setItem('sessionId', res.data.sessionId);

        setLoggedIn(true);
        if(res?.data?.role === 'admin')
        {
          setIsAdmin(true);
          navigate('/admin-dashboard');
        }
        else
        {
          setIsAdmin(false);
          navigate('/products');
        }
      }
      else
      {
        setMessage(res.response.data.errorMessage);
      }
    }

    catch(err)
    {
      console.log(err)
    }

  }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

  return (
    <div>
        <Paper elevation={10} sx={{ height: '50%', width: '40%', margin: 'auto', marginTop: '10%' }}>
          <Box sx={{ padding: '20px' }}>
            <Typography variant='h4' sx={{ml:'40%', mb:'30px'}}>Login</Typography>
            <form >
              <FormControl fullWidth>
                <FormLabel>Username</FormLabel>
                <Input value={username} type="text" 
                  onChange={(e)=>setUsername(e.target.value)}/>
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: '20px' }}>
                <FormLabel>Password</FormLabel>
                <Input type="password"  value={password}
                  onChange={(e)=>setPassword(e.target.value)}/>
              </FormControl>

              {
                message &&
                  <Alert severity="error" sx={{mt:'40px', width:'75%'}}>{message}</Alert>
              }

              <Button variant="outlined" onClick={handleSubmit}
                sx={{mt:'40px', ml:'85%'}}>
                Login
              </Button>

              <Typography variant='h6'>New User : <NavLink
                to='/'>Signup</NavLink></Typography>


            </form>
          </Box>
        </Paper>
    </div>
  )
}

export default Login
