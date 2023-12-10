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

            {examData.object.map((element, index) => 
            <div>
            <h3>{element.question}</h3>
                

              
              {/* {JSON.parse(element.choices).map((el, ind)=>
              <div> 
                
                <input key={ind} type="radio" value={element} />{el} 
              
              </div>
             
              
              )} */}

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


function fetchExam(){


  const [examData, setExamData] = useState([]);

  
    axios.get('http://localhost:8000/get_question')
      .then(response => {
        console.log(response.data.message);
        console.log("question data --> " + response.data.object[18].question);
        setExamData(response.data.object);
        console.log(response.data.choices)
      })
      .catch(error => {
        console.log(error);
      });


}

