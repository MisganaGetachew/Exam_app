
import { useState } from "react" 


function Btn(){

const[mode, setMode] = useState(false) 

const dark = <h1>dark mode _</h1>
const light = <h1>light mode</h1>


    
function checkMode(){
setMode(!mode)

}
 return  (
    <div> 
    <button onClick={checkMode}>change mode</button> 
     <h2>the mode is {mode ? dark : light}</h2>
    </div>) 
    
}

   


export default Btn

