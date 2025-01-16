import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FileClaim from "./pages/FileClaim";
import AccountManagment from "./pages/AccountManagment";
import ApproveNewCustomer from "./pages/ApproveNewCustomer";
import ClaimApproval from "./pages/ClaimApproval";
import MakePayment from "./pages/MakePayment";
import ProcessPayment from "./pages/ProcessPayments";
import ProvideData from "./pages/ProvideData";
import RequestUnderwriter from "./pages/RequestUnderwriter";
import RiskAssessment from "./pages/RiskAssessment";
import ViewClaimEstimate from "./pages/ViewClaimEstimate";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fileclaim" element={<FileClaim />} />
        <Route path="/accountmanagment" element={<AccountManagment />} />
        <Route path="/approvenewcustomer" element={<ApproveNewCustomer />} />
        <Route path="/claimapproval" element={<ClaimApproval />} />
        <Route path="/makepayment" element={<MakePayment />} />
        <Route path="/processpayment" element={<ProcessPayment />} />
        <Route path="/providedata" element={<ProvideData/>} />
        <Route path="/requestunderwriter" element={<RequestUnderwriter/>} />
        <Route path="/riskassesment" element={<RiskAssessment />} />
        <Route path="/viewclaimestimate" element={<ViewClaimEstimate/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
