import React from 'react';
import Nav from './components/Nav';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

function App() {
  return (

    <div className='container'>
      <div className='row'>
        <div className='col-md-3 m-lg-auto orange'>
          <p>In a groundbreaking discovery, scientists have identified a new exoplanet, named Kepler-452b,
            with potential habitability. Situated in the habitable zone of its star, Kepler-452b shares similarities
            with Earth, raising hopes for extraterrestrial life. Meanwhile,
            global leaders convened to address the escalating climate crisis, proposing ambitious targets to</p>
        </div>
        <div className='col-md-4 green'>
        <p>In a groundbreaking discovery, scientists have identified a new exoplanet, named Kepler-452b,
            with potential habitability. Situated in the habitable zone of its star
            </p>
        </div>
      </div>  
    </div>

  );
} 

export default App;
