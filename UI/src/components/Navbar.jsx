import React, { useContext } from 'react'
import { Tab, Tabs, Box, AppBar, Typography, Badge } from '@mui/material';
import { MyContext } from '../contexts/MyContext';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import Person2Icon from '@mui/icons-material/Person2';
import axios from 'axios';


function Navbar() {

  const {tab, setTab, isAdmin, cartSize} = useContext(MyContext);
  const navigate = useNavigate();

  const handleTitleClick = ()=>{
    if(isAdmin)
    {
      navigate('/admin-dashboard')
    }
    else
    {
      navigate('/products');
    }
  }

  const logOut = async()=>{
    
    try
    {
      const resp = await axios.post('http://localhost:8080/logout', {
        userId: sessionStorage.user,
        sessionId: sessionStorage.sessionId
      })

      // console.log(resp)
            
      if(resp.data?.success)
      {
        sessionStorage.clear();
        navigate('/')
      }
      else
      {
        throw new Error('Logout failed');
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }

  return (
    <AppBar position='static' color='grey'>
        <Box sx={{display:'flex', justifyContent:'space-around'}}>
          <Box>
            <Typography sx={{fontFamily:'fantasy', mt:'20px', fontWeight:'bold', cursor:'pointer'}} 
              onClick={handleTitleClick}>
              EdTech
              </Typography>
          </Box>
          {
            isAdmin?
            <Tabs value={tab} onChange={(e, newVal)=>{setTab(newVal)}} centered >
              <Tab label="Products" />
              <Tab label="Users" />
              <Tab label="Add Course" />
            </Tabs> :
            <Box></Box>
          }
          <Box sx={{display:'flex', justifyContent:'flex-end', mt:'10px'}}>
            
            {
                !isAdmin&&
                <>
                  <Person2Icon sx={{cursor:'pointer', mr:'10px'}} onClick={()=>navigate('/user-profile')} fontSize='medium'/>
            
                  <Badge badgeContent={cartSize} sx={{mr:'12px'}}>
                    <ShoppingCartIcon fontSize="medium" sx={{cursor:'pointer'}}
                      onClick={() => navigate("/cart")} />
                  </Badge>
                </>
            }
            
            <LogoutIcon sx={{cursor:'pointer', mr:'6px'}} onClick={logOut} 
              fontSize='medium'/>

          </Box>
        </Box>
    </AppBar>
  )
}

export default Navbar
