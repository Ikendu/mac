import { BrowserRouter, Router, Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Dashboard from './pages/dashboard'
import Footer from './components/Footer'
import Header from './components/Header'
import DashboardForm from './pages/DashboardForm'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboardform' element={<DashboardForm />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
