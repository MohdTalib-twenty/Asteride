import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Screens/Login';
import Register from './Screens/Register';
import Home from './Screens/Home';
import AddTask from "./Screens/AddTask"
import EditTask from "./Screens/EditTask"
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';


function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/edit/:_id/:Title/:Body' element={<EditTask/>}/>
        <Route path='/add' element={<AddTask/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
