import {Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import ProductsPage from './pages/ProductsPage'
import { useContext, useEffect } from 'react'
import { MyContext } from './contexts/MyContext'
import { useNavigate } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import Cart from './pages/Cart'
import UpdateProduct from './pages/UpdateProduct'


function App() {

  const {loggedIn, setLoggedIn, isAdmin} = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(()=>{
    if(sessionStorage.getItem('user'))
    {
      setLoggedIn(true);
    }
    else
    {
      navigate('/');
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        
        {
          loggedIn &&
          <>
            {
              isAdmin &&
              <>
               <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
               <Route path='/update-product' element={<UpdateProduct/>}/>
              </>
            }
            {
              !isAdmin &&
              <>
                <Route path='/products' element={<ProductsPage/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/user-profile' element={<UserProfile/>}/>
              </>
            }
          </>
        }
      </Routes>
    </>
  )
}

export default App