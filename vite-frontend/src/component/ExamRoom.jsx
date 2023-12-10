import { useState, useContext , useEffect , useRef} from 'react'
import axios from 'axios';
import { MyContext } from '../context/MyContext'


export default function ExamRoom() {
  // const [examData, setExamData] = useState([]);  use it as a context
  const [dataFetched, setDataFethced] = useState(false)
  const { examData, setExamData } = useContext(MyContext);


  // The empty dependency array ensures this effect runs only once (on mount)'

  // so here is the plan work on a single question first.  



  return (
    <div>
              
            {/* <h3>{examData.object[18].question}</h3> */}

            {examData.map((element, index) => 
            <div>
                          

              
  
               
               <Question question = {element.question}  choices = {element.question_choices}  id = {element.id}/>     
             
      
            </div>
            
           
            )}

          


           
      
      
    </div>
  );
}



// this is is to make multiple questions appear
{/* {examData.map((element, index) => ( // Added return statement and key for each element
       <div className='exam_room'> <h4 key={index}>{element.question}</h4>
        <input type="radio" value="" />{element.question_choices}
      
        
        </div>
      ))} */}


function Question(props){

  return(
      <div className='square_div_Exam'>

        <h2>{props.question}</h2>
        {props.choices.map((element, index)=>
        <div className='choice' > <input key={index} type="radio" name={props.id} value={element}/>{element}
        </div>
       
        )}
        

      </div>
  )

  
}