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
    

    function User (){


        // axios.get('http://localhost:8000/get_question')
        // .then(response =>{
        //     console.log(response.data.message)
        //     console.log(response.data.object)
        //     SetExamData(response.data.object)
        //     {examData?<ExamRoom data = {examData}/>:null}

        // })
        // .catch(error => {
        //     console.log(error)
        // })
navigate('/exam_room')
      
    }
        
    
    
      return (
    
        <div className='square_div'><h1>{data.user_name}</h1>
      
        <button className='button_sec_home' onClick={ User}>Take Exam</button> <br></br>
        <button className='button_sec_home' onClick={studHome}>Home</button>
        {/* {examData?
        
        examData.map((element)=>{<h5>{element.question}</h5>})
        :null}
         */}
        </div>
      )
    
      
    }


