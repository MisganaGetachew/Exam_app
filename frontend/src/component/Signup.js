
import React from "react"
import axios from 'axios'
import {Route, Routes, Link, useNavigate , redirect} from 'react-router-dom'
import { useState, useContext , useEffect} from 'react'
import '../App.css'
import '../index.css'
import { MyContext } from '../context/MyContext'






function Signup(){
    const { data, setData } = useContext(MyContext);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()


    const mystyle = {
      fontSize: "15px",
      color: "red",
      // textAlign: "center"
      marginLeft: "80px",
      marginTop: "30px"
    }

    function SubmitHander(e){
      e.preventDefault();

     // call server for signup
      const jasonData = {"user_email": email, "user_name": name, "password": pass1, "password_confirmed": pass2 }

      axios.post("http://localhost:8000/add_user", jasonData)
      .then(response=>{
        console.log("data sent succefully")
        console.log(response.data.message)
        setMessage(response.data.message)
        if(response.data.message === 'Signedup succesfully! Go to login page?'){
          alert(response.data.message)
        navigate("/");

        }

        else{
          setMessage(response.data.message)
          alert(response.data.message)
        }
        setData(jasonData)
        console.log(jasonData)
        // navigate("/secured");
        // <redirect to="/secured" />  

      })
      .catch(error=>{
        console.log(error)
        setMessage(error.message)
        alert(error.message)

      })
      

      
    }

    return (
      
  <div className='square_div'> 
        <div className='form_element_div'>
         <form onSubmit={SubmitHander}>    <h2>Sign up</h2>
      <input className='form_element' placeholder="Name" type="text " onChange={(e)=> setName(e.target.value)} required></input>
      <div className='form_element_div'>
        <input className='form_element' placeholder="youremail@gmail.com" type="Email" onChange={(e)=> setEmail(e.target.value)} required></input>
        </div>
      <div className='form_element_div'>
        <input className='form_element' placeholder="Password" type="Password" onChange={(e) => setPass1(e.target.value)} required></input> 
      </div>
      <div className='form_element_div'>
        <input className='form_element' placeholder="confirm password" type="Password" required onChange={(e)=> setPass2(e.target.value)}></input> 
        </div>
      <div className='button_div'>

      <div className='link_div'>
    <Link to="/"><p >Have an account? Login</p></Link>
      </div>
    <button className='button_log' type='submit' >Submit</button>


      </div>  
      </form> 
      {/* {message? <div className='link_div'>
        <p style={mystyle}>{alert(message)}</p>
          </div> : null} */}
       </div>
       </div>

)

  }


export default Signup;