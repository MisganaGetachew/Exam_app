
// import React from "react"
import axios from 'axios'
import {Route, Routes, Link, useNavigate , redirect} from 'react-router-dom'
import { useState, useContext , useEffect , useRef} from 'react'
import '../App.css'
import '../index.css'
import { MyContext } from '../context/MyContext'



export default function SecuredPage(){
    const { data, setData } = useContext(MyContext);
    const [type, setType] = useState() 
    const [question, setQuestion] = useState()
    
    function questionSender( question){
      // e.preventDefault()
      console.log(question)
      console.log(type)
      let jasonData = ""
      if(type == "choice"){
        question["question_type"] = type
        jasonData = question
        console.log(jasonData);
      }

      else if(type == "text"){
      setQuestion(question)


      jasonData = {"question_type":type, "question": question}


      }


      axios.post('http://localhost:8000/add_question', jasonData).then(response =>{
        // console.log(response.data.message)
        alert(response.data.message)
        // e.preventDefault()
      })
      .catch(error=>{
        alert(error.message)
        console.log(error.message)
      })
    }
  
    function changeHandler(e){
      console.log('input changed')
      console.log(e.target.value)
      setType(e.target.value)

    }

    function submitHandler(e){
      e.preventDefault()
      console.log("submit button clicked ")
      console.log(e)
    }
  
  
    return(
  
      <div className='secured_page'>   
         <h1> welcome to quiz genius</h1>
         <h4>USER : {data.user_name} </h4> 

  

  
     
         {/* <form onSubmit={submitHandler}>   */}
          <label for="question_type">Question Type  </label>
     <select className='select_option' name="question_type" onChange={(e) => changeHandler(e) }>
   <option className='options' value="">select an option</option>
    <option className='options' value="text">Essay</option>
    <option className='options' value="choice">Multiple Choice</option>
    <option  className='options'value="true/false">True or False</option>
    <option className='options' value="code">Coding Problem</option>
    <option className='options' value="other">Other Type</option>
 
  </select>

         
        
         
  <br></br>
         
        <EssayQuestion  data={type} questionSender = {questionSender} />
        <MultipleQuestion data={type}  questionSender = {questionSender}/>

      



      </div>
   
  
      
    )
  }
  

  function EssayQuestion(props){
    const [text, setText] = useState('')

    function setTexter(text, e){
      e.preventDefault()
      props.questionSender(text)
    }

    if (props.data == 'text'){
      return(
      <div>

 <br></br>
        <form onSubmit={(e) => setTexter(text, e)}>
          <textarea id='essay_question' className='textarea_sec' rows={5} cols={50} onChange={(e) => setText(e.target.value)} placeholder='write your Essay question here' required></textarea><br></br>
<         button className='button_sec'>+</button>
        <input className='button_sec' type='submit'/></form>
         

      </div>
    )
    }
    
  }


 function MultipleQuestion(props){
  const [choice, setChoice] = useState([]);
  const [questions, setQuestions] = useState()
  const [answer, setAnswer] = useState()
  
  // setQuestions([...questions, "question 1"])
  function  addChoice(){
    setChoice([...choice, ""])
    
  }

  function addQuestion(){
    setQuestions([...questions, "question"])
    // addChoice()

  }

  function submitHandler(e){
    e.preventDefault()
    const newch = [...choice, answer]
    const jsnlist  = JSON.stringify(newch)
    const info = {"question": questions, "choice_list": jsnlist}
    props.questionSender(info)
    setQuestions("")
    setAnswer("")
    
    

    // console.log(choice, answer)
  }
 

  if(props.data == "choice")
  return (
    <div className='multiple_choice'>
        <form onSubmit={submitHandler}> 
      <br></br>
      <input className = "question_input" type='text' value={questions} onChange={(e) => setQuestions(e.target.value)} placeholder='Write Your Question Here' required/>
      <br></br>
      
        

  {choice.map((element, index) => 
  <input className='choice' key = {index} value={choice[index]} onChange={(e)=>{
    const newarr = [...choice]
    newarr[index] = e.target.value
    setChoice(newarr)
  }

  } placeholder={`Choice ${index + 1}` } /> )} 
  <input className='choice' placeholder='insert Answer' value={answer} onChange={(e) => setAnswer(e.target.value)} required/><br></br>
  <input  className = "button_sec" type='submit'/><button className='button_sec' onClick={addChoice}>add choice</button>
</form>

{/* <button className='button_sec' onClick={addQuestion}>question</button> */}


    </div>  )
 }


