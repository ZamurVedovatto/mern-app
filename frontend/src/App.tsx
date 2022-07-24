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

function App() {
  const {showNabar} = useLayoutContext()

  return (
    <div>
      <BrowserRouter>
        {/* {
          showNabar && <Navbar />
        } */}
        <Navbar />
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
