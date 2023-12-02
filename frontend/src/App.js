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

const [data, setData] = useState(" ")
const [user, setUser] = useState() 

// function User(user){
//   setUser(user)
//   console.log(user)

// }

return(

<MyContext.Provider value={{ data, setData, user, setUser}}>
  <Routes>
    <Route path='/' element = {<Home />}/>
    <Route path='stud_login' element = {<StudentHome />}/>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/secured" element={<SecuredPage />} />
  </Routes>
</MyContext.Provider>
   


  )
}




 function Home(props){

const navigate = useNavigate()
const {user, setUser} = useContext(MyContext)

  function User (msg){
    setUser(msg)
    navigate('/login')
    }


return (
  <div className='square_div'><h1>who are you?</h1>
  
  <button className='button_sec_home' onClick={()=> User("student")}>Student</button> <br></br>
  <button className='button_sec_home' onClick={()=> User("teacher")}>Teacher</button>
  
  </div>


)
  

}


function StudentHome(){
const {user, setUser} = useContext(MyContext)
const navigate = useNavigate()

function studHome(){
  navigate('/')
}

  function User (msg){
    setUser(msg)
    navigate('/login')
    }


  return (

    <div className='square_div'><h1>Page under development</h1>
  
    <button className='button_sec_home' onClick={()=> User("teacher")}>Teacher</button> <br></br>
    <button className='button_sec_home' onClick={studHome}>Home</button>
    
    </div>
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


