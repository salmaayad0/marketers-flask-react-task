import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './features/Layout';
import Login from './features/Login';
import SignUp from './features/SignUp';
import Home from './features/Home';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Login />} /> 
        <Route path='/signup' element={<SignUp />} /> 
        <Route path='/home' element={<Home />} /> 
      </Route> 
    </Routes>
  );
}

export default App;
