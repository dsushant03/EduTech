import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Divider, Box, Container, Button, Modal, FormControl, Input, FormLabel } from '@mui/material';

function Users() {

  const [users, setUsers] = useState([])
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(()=>{
    getData();
  }, [])

  const getData = async()=>{
    const resp = await axios.get('http://localhost:8080/getAllUsers');
    setUsers(resp.data);
  }

  const prepForUpdate = (user)=>{
    setOpen(true);
    setUser(user.username);
    setId(user._id);
  }

  const handleUpdate = async()=>{
    const res = await axios.patch('http://localhost:8080/updateUser', {
      id, 
      username
    });
    setOpen(false);
    setId('');
    setUsername('');
    getData();
  }

  const handleDelete = async(id)=>{
    const res = await axios.delete(`http://localhost:8080/deleteUser?id=${id}`);
    getData();
  }

  return (
    <>
        <Container sx={{mt:'70px'}}>
          {
            users.length > 0 ?
            users.map((e)=>(
              <Box key={e._id} sx={{mt:'15px'}}>
                <Box sx={{display:'flex', justifyContent:'space-between'}}>
                  <Typography variant='h6' sx={{mb:'10px', ml:'40px'}}>{e.username}</Typography>
                  <Box>
                    <Button variant='outlined' size='small' sx={{mr:'20px'}}
                      onClick={()=>prepForUpdate(e)}>
                      Update</Button>
                    <Button variant='outlined' size='small' sx={{mr:'40px'}} 
                      onClick={()=>handleDelete(e._id)}>
                      Delete</Button>
                  </Box>
                </Box>
                <Divider />
              </Box>
            )) :
            <Typography>No users have signed up yet.</Typography>
          }
        </Container>
        <Modal
          open={open}
          onClose={()=>setOpen(false)}>

          <Box sx={{bgcolor:'white', height:'35%', width:'25%', ml:'35%', mt:'15%', p:'40px' }}>
            <Typography variant="h6" component="h2">
              Current username : {user}
            </Typography>
            <FormControl sx={{mt:'30px', width:'80%'}}> 
                <FormLabel>Enter new username</FormLabel>
                <Input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} />
            </FormControl>
            <Button sx={{mt:'40px', ml:'270px'}} variant='outlined' onClick={handleUpdate}>Update</Button>
          </Box>
        </Modal>
    </>
  )
}

export default Users
