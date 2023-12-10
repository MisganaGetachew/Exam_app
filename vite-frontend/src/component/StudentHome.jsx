import axios from 'axios'
import { MyContext } from '../context/MyContext'
import {Route, Routes, Link, useNavigate , redirect} from 'react-router-dom'
import { useState, useContext , useEffect , useRef} from 'react'
import ExamRoom from './ExamRoom'




export default function StudentHome(){
    // const {user, setUser} = useContext(MyContext)
    const { data, setData } = useContext(MyContext);
    const {examData, setExamData} = useContext(MyContext);
    const [dataFetched, setDataFethced] = useState(false)

    
    const navigate = useNavigate()

    
    function studHome(){
      navigate('/')
    }
    

    function User (){


      axios.get('http://localhost:8000/get_question')
      .then(response => {
        console.log(response.data.message);
        console.log("data sent from backend");
        console.log(response.data.object);
        console.log("question data --> " + response.data.object[18].question);
        setExamData(response.data);
        console.log(response.data.choices[18].question_choices)
        setDataFethced(true)
        navigate('/exam_room')
        // alert("question retrived")
      })
      .catch(error => {
        console.log(error);
        alert(error)
      });
      
    }
        
    
    
      return (
    
        <div className='square_div'><h1>{data.user_name}</h1>
      
        <button className='button_sec_home' onClick={ User}>Take Exam</button> <br></br>
        <button className='button_sec_home' onClick={studHome}>Home</button>

       

       {/* <MyContext.Provider value={{examData, setExamData }}>

       {dataFetched? <ExamRoom /> : null} 
    
  </MyContext.Provider>
      */}

     
      
        </div>
      )
    
      
    }


