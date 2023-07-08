import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <>
    <Router>
    <Routes>
    <Route path="/" element={
      <Login/>
    }/>
    <Route path="/home" element={
      <Home/>
    }/>
    <Route path="/about" element={
      <About/>
    }/>
    </Routes>
    </Router>
    
    </>
  );
}

export default App;
