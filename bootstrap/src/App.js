// App.js
import React from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className='container-fluid'>
      <div className='App'>
        
          <div className='row'>
            <div className='col-12' id="navbar">
              <h1>This is my First Bootstrap website</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-12' id='menu'>
            <Nav />
            </div>
          </div>
          <div className='row'>
            <div className='col-8' id='contant'>
              <h6>This is my First Bootstrap website This is my First Bootstrap website This is
                my First Bootstrap website This is my First Bootstrap website This is my First Bootstrap website
                This is my First Bootstrap website This is my First Bootstrap website This is
                my First Bootstrap website This is my First Bootstrap website This is my First Bootstrap website
                This is my First Bootstrap website This is my First Bootstrap website This is
                my First Bootstrap website This is my First Bootstrap website This is my First Bootstrap website</h6>
            </div>
            <div className='col-4' id='slider'>
              <Nav />
            </div>
          </div>
          <div className='row'id='footer'>
            <div className='col-12'>
              @copyright 2024.
            </div>
          </div>
        </div>

        </div>
    </BrowserRouter>
    
  );
}

export default App;
