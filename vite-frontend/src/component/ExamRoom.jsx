import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExamRoom() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/get_question')
      .then(response => {
        console.log(response.data.message);
        console.log(response.data.object);
        setExamData(response.data.object);
      })
      .catch(error => {
        console.log(error);
      });
  }, []); // The empty dependency array ensures this effect runs only once (on mount)

  return (
    <div>
      {examData.map((element, index) => ( // Added return statement and key for each element
        <h5 key={index}>{element.question}</h5>
      ))}
    </div>
  );
}
