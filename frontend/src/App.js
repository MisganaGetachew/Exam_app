import axios from 'axios'
import {Route, Routes, Link, useNavigate , redirect} from 'react-router-dom'
import { useState, useContext , useEffect} from 'react'
import './App.css'
import './index.css'
import { MyContext } from './context/MyContext'
import './component/Login'
import Login from './component/Login'
import Signup from './component/Signup'
import SecuredPage from './component/SecuredPage'




export default function App(){

const [data, setData] = useState('') 

return(

<MyContext.Provider value={{ data, setData }}>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/secured" element={<SecuredPage />} />
  </Routes>
</MyContext.Provider>
   


  )
}






// global usage of useState  trual

  const mystyle = {
    fontSize: "15px",
    color: "red",
    // textAlign: "center",
    marginLeft: "80px",
    marginTop: "30px"

}


