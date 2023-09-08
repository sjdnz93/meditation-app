// !React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// !Components
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './components/Profile';



function App() {
  return (
    <main>
      <h1>Meditation App</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
