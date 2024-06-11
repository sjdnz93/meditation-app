// !React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// !Components
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './components/profile/Profile';




function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
