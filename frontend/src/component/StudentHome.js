import axios from 'axios'
import { MyContext } from '../context/MyContext'
import {Route, Routes, Link, useNavigate , redirect} from 'react-router-dom'
import { useState, useContext , useEffect , useRef} from 'react'



export default function StudentHome(){
    const {user, setUser} = useContext(MyContext)
    const { data, setData } = useContext(MyContext);
    const navigate = useNavigate()

    
    function studHome(){
      navigate('/')
    }
    
      function User (msg){
        setUser(msg)
        navigate('/login')
        }
    
    
      return (
    
        <div className='square_div'><h1>{data.user_name}</h1>
      
        <button className='button_sec_home' onClick={()=> User("teacher")}>Teacher</button> <br></br>
        <button className='button_sec_home' onClick={studHome}>Home</button>
        
        </div>
      )
    
      
    }
    