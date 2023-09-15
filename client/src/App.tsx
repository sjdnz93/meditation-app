// !React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// !Components
import Login from './auth/Login';
import Register from './auth/Register';
import Profile from './components/profile/Profile';
import Footer from './components/footer/Footer';



function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
          <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
