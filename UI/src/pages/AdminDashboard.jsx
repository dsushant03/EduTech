import Navbar from '../components/Navbar'
import Products from '../components/Products'
import { useContext, React } from 'react'
import { MyContext } from '../contexts/MyContext'
import Users from '../components/Users'
import AddProduct from '../components/AddProduct'

function AdminDashboard() {
  const {tab, setTab} = useContext(MyContext);
  return (
    <>
        <Navbar/>
        {
          tab == 0 ?
          <Products/> :
          tab == 1?
          <Users/> :
          <AddProduct/>
        }

    </>
  )
}

export default AdminDashboard
