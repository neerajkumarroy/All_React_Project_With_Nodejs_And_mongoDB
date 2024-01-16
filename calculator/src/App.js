import { useState } from 'react';
import './App.css';

function App() {
const[value,setValue]=useState("");
  return (
        <div className='container'>
      <div className='calculator'>
        <form >
          <div className='display'>
            <input type='text' value={value}></input>
          </div>        
          <div>
            <input type='button' value="AC" onClick={e => setValue('')}></input>
            <input type='button' value="DE" onClick={e => setValue(prevValue => String(prevValue).slice(0, -1))}></input>
            <input type='button' value="." onClick={e => setValue(value + e.target.value)}></input>
            <input className='brown' type='button' value="/" onClick={e => setValue(value + e.target.value)}></input>
          </div>
          <div>
            <input type='button' value="7" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="8" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="9" onClick={e => setValue(value + e.target.value)}></input>
            <input  className='brown' type='button' value="*" onClick={e => setValue(value + e.target.value)}></input>
          </div>
          <div>
            <input type='button' value="4" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="5" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="6" onClick={e => setValue(value + e.target.value)}></input>
            <input  className='brown' type='button' value="+" onClick={e => setValue(value + e.target.value)}></input>
          </div>
          <div>
            <input type='button' value="1" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="2" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="3" onClick={e => setValue(value + e.target.value)}></input>
            <input  className='brown' type='button' value="-" onClick={e => setValue(value + e.target.value)}></input>
          </div>
          <div>
            <input type='button' value="00" onClick={e => setValue(value + e.target.value)}></input>
            <input type='button' value="0" onClick={e => setValue(value + e.target.value)}  ></input>
            <input className='equal' type='button' value="="  onClick={e => setValue(eval(value))}></input>            
          </div>
        </form>
      </div>
    </div>

  );
}
export default App;
