import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DashboardForm from "./pages/DashboardForm";
import Transactions from "./pages/Transactions";
import Statement from "./pages/Statement";
import ContactInfo from "./pages/ContactUs";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardform" element={<DashboardForm />} />
          <Route path="/all-transactions" element={<Transactions />} />
          <Route path="/statement" element={<Statement />} />
          <Route path="/contact-info" element={<ContactInfo />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
