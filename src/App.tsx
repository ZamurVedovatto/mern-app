import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import ClientQueue from './pages/ClientQueue'
import Home from './pages/Home'
import Navbar from './components/Navbar'

import { useLayoutContext } from './hooks/useLayoutContext'

function App() {
  const { state } = useLayoutContext();
  const { showNavbar } = state;
  return (
    <div>
      <BrowserRouter>
        {
          showNavbar && <Navbar />
        }
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup123" element={<Signup />} />
            <Route path="/client"  element={<ClientQueue />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
