import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import ClientQueue from './pages/ClientQueue'
import Home from './pages/Home'
import Navbar from './components/Navbar'

// contexts
import { useLayoutContext } from './hooks/useLayoutContext'

import { initiateSocketConnection, disconnectSocket, subscribeToChat, subscribeToTimer } from './services/socketio.service'

function App() {
  const [timeStamp, setTimeStamp] = useState(0)
  const {showNabar} = useLayoutContext()

  useEffect(() => {
    initiateSocketConnection();
    return () => {
      initiateSocketConnection()
      disconnectSocket()
    }
  }, []);

  const onTest = () => {
    subscribeToChat((err, data) => {
      console.log(data);
    });
  }

  useEffect(() => {
    subscribeToTimer((err, timestamp) => {
      setTimeStamp(timestamp)
    })
    return () => {
      subscribeToTimer()
    }
  }, [])

  return (
    <div>
      <BrowserRouter>
        {/* {
          showNabar && <Navbar />
        } */}
        <Navbar />
        <p>{timeStamp} aa</p>
        <button onClick={() => onTest()}>testing</button>
        <div className="pages">
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/client"  element={<ClientQueue />} />
            <Route path="/" exact element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
