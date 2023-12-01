import logo from './logo.svg';
// import './App.css';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
// import avatar from './avatar.png'
import Time from './component/Time';
import Btn from './component/Btn';
import './index.css'
import { useState } from 'react';

export default function App() {

  const [count, setCount] = useState(0)
  let [win, setWin] = useState(null)

  let [turn, setTurn] = useState(Array(9).fill('_'))

  const w = winner(turn)
  let status;
  if(w == "X"){
      status = "X"
      
  }
  else if (w == "O"){
    status = "O"
    
  }

  else{
    status = "_"
  }

  function setter(i) {
   

    // else{
    //   alert("next")
    // }
    // console.log("this is winners value "+w)
    
            setCount(count + 1)
            const items = turn.slice()
            if (count%2 == 0 && items[i] == '_' ){
          
            items[i] = 'X';
            setTurn(items)
          

          }
            else if (count%2 != 0 && items[i] == '_'){
              items[i] = 'O';
              setTurn(items)
              console.log(count)
              
            }

    setWin(win)
    }



  return (
    <div className='square_div'>
      <div className='board-row'>

        <Board value = {turn[0] } onClick = {()=> setter(0)}/>
        <Board value = {turn[1] } onClick = {()=> setter(1)}/>
        <Board value = {turn[2] } onClick = {()=> setter(2)}/>


      </div>
      <div className='board-row'>
      <Board value = {turn[3] } onClick = {()=> setter(3)}/>
      <Board value = {turn[4] } onClick = {()=> setter(4)}/>
      <Board value = {turn[5] } onClick = {()=> setter(5)}/>


      </div>
      <div className='board-row'>
      <Board value = {turn[6] } onClick = {()=> setter(6)}/>
      <Board value = {turn[7] } onClick = {()=> setter(7)}/>
      <Board value = {turn[8] } onClick = {()=> setter(8)}/>

      </div>
      
      <h2>winner:  {status}</h2>
    </div>

  );
};


function Board({value, onClick  }) {


  
  return (<button className='square' onClick={onClick} >{value}</button>)



}


function winner(turn){
  const temp = turn.slice()


  if (
    temp[0] == 'X' && temp[1] == 'X' && temp[2]  == "X"||
    temp[3] == 'X' && temp[4] == 'X' && temp[5]  == "X"||
    temp[6] == 'X' && temp[7] == 'X' && temp[8]  == "X"||
    temp[0] == 'X' && temp[3] == 'X' && temp[6] == "X" ||
    temp[1] == 'X' && temp[4] == 'X' && temp[7] == "X" ||
    temp[2] == 'X' && temp[5] == 'X' && temp[8] == "X" ||
    temp[0] == 'X' && temp[4] == 'X' && temp[8] == "X" ||
    temp[2] == 'X' && temp[4] == 'X' && temp[6] == "X"

    
  ){
    
    return "X";
    
  }
  else if(
    temp[0] == 'O' && temp[1] == 'O' && temp[2]  == "O"||
    temp[3] == 'O' && temp[4] == 'O' && temp[5]  == "O"||
    temp[6] == 'O' && temp[7] == 'O' && temp[8]  == "O"||
    temp[0] == 'O' && temp[3] == 'O' && temp[6] == "O" ||
    temp[1] == 'O' && temp[4] == 'O' && temp[7] == "O" ||
    temp[2] == 'O' && temp[5] == 'O' && temp[8] == "O" ||
    temp[0] == 'O' && temp[4] == 'O' && temp[8] == "O" ||
    temp[2] == 'O' && temp[4] == 'O' && temp[6] == "O"
  ){
    return "O";
  }
}


