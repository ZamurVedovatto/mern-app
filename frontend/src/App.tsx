import { BrowserRouter, Routes, Route} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";

// pages & components
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="pages">
          <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<Signup />} />
            <Route path="/" exact element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
