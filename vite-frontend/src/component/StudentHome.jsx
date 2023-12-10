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
        // console.log("question data --> " + response.data.object[18].question);
        // console.log(response.data.choices[18].question_choices)
// write a loop to traverse throup the 
        let examObject = [];
        response.data.object.forEach(element =>  { if(element.question_type == "choice"){
           examObject.push(element)
          element.question_choices = JSON.parse(element.question_choices)
          // do some randimization here, it's hard do from the backend
          
          }
          
        });          

        setExamData(examObject);
        console.log("this is exam object")
        console.log(examObject)

        



        setDataFethced(true)
        navigate('/exam_room')
        // alert("question retrived")
      })
      .catch(error => {
        console.log(error);
        alert("sorry the Exam room is on close for now !")
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


