// !React
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// !Components
import Login from './auth/Login';



function App() {
  return (
    <main>
      <h1>Meditation App</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>


        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
