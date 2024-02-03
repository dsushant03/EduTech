import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import {Alert, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel, Input, Button, Paper, Box, Typography} from '@mui/material'
import axios from 'axios';

function Signup() { 

  const navigate = useNavigate();
  
  const handleSubmit = ()=>{
    axios.post("http://localhost:8080/signup",{
      username,
      password,
      role
    })
    .then((res)=>{
      if(res.data.success)
      {
        setMessage('');
        navigate('/login');
      }
      else{
        console.log(res)
      }
    })
    .catch((err)=>{
      console.log(err)
      console.log(err.response.data.errorMessage)
      setMessage(err?.response?.data.errorMessage);
      console.log(message)
    })
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div>
        <Paper elevation={10} sx={{ height: '50%', width: '40%', margin: 'auto', marginTop: '10%' }}>
          <Box sx={{ padding: '20px', ml:'10%' }}>
            <Typography variant='h4' sx={{ml:'30%', mb:'30px'}}>Signup</Typography>
            <form>
              <FormControl sx={{mt:'30px', width:'80%'}}> 
                <FormLabel>Username</FormLabel>
                <Input type="text" name='username' value={username} 
                  onChange={(e)=>setUsername(e.target.value)} />
              </FormControl>

              <FormControl fullWidth sx={{ marginTop: '20px', width:'80%'}}>
                <FormLabel>Password</FormLabel>
                <Input type="password" name='password' value={password} 
                  onChange={(e)=>setPassword(e.target.value)}/>
              </FormControl>

              <FormControl sx={{ marginTop: '40px', width:'80%'}}>
                <FormLabel>Role</FormLabel>
                <RadioGroup row  value={role} onChange={(e)=>setRole(e.target.value)}>
                  <FormControlLabel value="admin" control={<Radio />} label="admin" />
                  <FormControlLabel value="user" control={<Radio />} label="user" />
                </RadioGroup>
              </FormControl>

              {
                message &&
                  <Alert severity="error" sx={{mt:'40px', width:'75%'}}>{message}</Alert>
              }

              <Box sx={{display:'flex', justifyContent:'space-between', mt:'50px', width:'80%'}}>
                <Typography variant='h6'>Already a user ? <NavLink
                  to='/login'>Login</NavLink></Typography>
                
                <Button variant="outlined"  
                  onClick={handleSubmit}>
                  Signup
                </Button>
              </Box>

            </form>
          </Box>
        </Paper>
    </div>
  )
}

export default Signup
