import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"

import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch  = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error)=>{
      console.log("error inside useEffect of app jsx", error)
    })
    .finally(setLoading(false))
  }, [])

  return (
   <>
   <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>

<div className='w-full block'>

   <Header/>
   {"outlet"}
   <Footer/>

</div>

   </div>
   
   </>
  )
}

export default App
