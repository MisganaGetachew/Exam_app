import React from "react"
import axios from 'axios'
import {Route, Routes, Link, useNavigate , redirect} from 'react-router-dom'
import { useState, useContext , useEffect} from 'react'
import '../App.css'
import '../index.css'
import { MyContext } from '../context/MyContext'



function Login() {
  const { data, setData } = useContext(MyContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Store password in state
  // const [message, setMessage] = useState('');  //don't need it for now
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Function called");

    // Call the server 
    const api_url = 'http://127.0.0.1:8000/find/' + email; 

    axios.get(api_url) 
      .then(response => {
        if (response.data.user_exists) {
          console.log(response.data.user_name);
          setData(response.data);
          // setMessage(response.data.message);  //don't need it for now
          // alert(response.data.message)
          navigate("/secured")
          // <redirect to="/secured" />  
        } else {
          console.log("else condition")
          // setData("don't exist");
          // setMessage()
          alert(response.data.message)
        }
      })
      .catch(error => {
        console.log('Bad request' + api_url);
        console.log(error.message);
        // setMessage(error.message)
        alert(error.message)
      });
  }

  return (
  <div className='square_div'> 

    <div className='form_element_div'>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className='form_element_div'>
          <input
            className='form_element'
            placeholder="youremail@gmail.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)} // Update email state
            required
          ></input>
        </div>
        <div className='form_element_div'>
          <input
            className='form_element'
            placeholder="Password"
            type="password" // Use type="password" for password input
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          ></input>
        </div>
        <div className='form_element_div'></div>
        <div className='button_div'>
          <div className='link_div'>
            <Link to="/signup"><p>No account, register here</p></Link>
          </div>
          <button className='button_log' type='submit'>Submit</button>
        </div>
      </form>
    
    </div>
    </div>
  );
}

export default Login;