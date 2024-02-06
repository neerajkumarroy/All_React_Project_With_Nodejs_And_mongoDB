import './App.css';
import Login from './components/Login';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forgotpassword from './components/Forgotpassword';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path='/' element={<h1><Login /></h1>} />
          <Route path='/signup' element={<h1><Signup /></h1>} />
          <Route path='/profile' element={<h1><Profile /></h1>} />
          <Route path='/forgot' element={<h1>< Forgotpassword /></h1>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
