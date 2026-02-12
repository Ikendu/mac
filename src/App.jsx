import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import DashboardForm from "./pages/DashboardForm";
import Transactions from "./pages/Transactions";
import Statement from "./pages/Statement";
import ContactInfo from "./pages/ContactUs";
import TransactionDetail from "./pages/TransactionDetail";
import Manager from "./pages/Manager";
import TransferPage from "./pages/TransferPage";
import OtherBankTransfer from "./pages/OtherBankTransfer";
import ConfirmTransfer from "./pages/ConfirmTransfer";
import SuccessTransfer from "./pages/SuccessTransfer";
import LoanRequest from "./pages/LoanRequest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboardform" element={<DashboardForm />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transfer/other-bank" element={<OtherBankTransfer />} />
          <Route path="/transfer/confirm" element={<ConfirmTransfer />} />
          <Route path="/transfer/success" element={<SuccessTransfer />} />
          <Route path="/loan-request" element={<LoanRequest />} />
          <Route path="/all-transactions" element={<Transactions />} />
          <Route path="/statement" element={<Statement />} />
          <Route path="/contact-info" element={<ContactInfo />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
