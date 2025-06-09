import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
