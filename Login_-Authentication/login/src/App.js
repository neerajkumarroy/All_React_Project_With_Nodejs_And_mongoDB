import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1><Login /></h1>} />
          <Route path='/signup' element={<h1><Signup /></h1>} />
          <Route path='/profile' element={<h1><Profile /></h1>} />
          <Route path='./login' element={<h1>Logout</h1>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
