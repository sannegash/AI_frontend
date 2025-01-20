import React, {useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FileClaim from "./pages/FileClaim";
import AccountManagment from "./pages/AccountManagment";
import UnderwriterRequests from "./pages/UnderwriterRequests";
import ClaimApproval from "./pages/ClaimApproval";
import MakePayment from "./pages/MakePayment";
import ProcessPayment from "./pages/ProcessPayments";
import ProvideData from "./pages/ProvideData";
import RequestUnderwriter from "./pages/RequestUnderwriter";
import RiskAssessment from "./pages/RiskAssessment";
import ViewClaimEstimate from "./pages/ViewClaimEstimate";
import CustomerHome from "./pages/CustomerHome";
import UnderwriterHome from "./pages/UnderwriterHome";
import ClaimOfficerHome from "./pages/ClaimOfficerHome";
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Check for the logged-in user from localStorage or another source
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setLoggedInUser({ username }); // Assuming you're storing just the username for now
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fileclaim" element={<FileClaim />} />
        <Route path="/accountmanagment" element={<AccountManagment />} />
        <Route path="/underwriterrequests" element={<UnderwriterRequests />} />
        <Route path="/claimapproval" element={<ClaimApproval />} />
        <Route path="/makepayment" element={<MakePayment />} />
        <Route path="/processpayment" element={<ProcessPayment />} />
        <Route path="/providedata" element={<ProvideData/>} />
        <Route path="/requestunderwriter" element={<RequestUnderwriter/>} />
        <Route path="/riskassesment" element={<RiskAssessment />} />
        <Route path="/viewclaimestimate" element={<ViewClaimEstimate/>} />
        <Route path="/customerhome" element={<CustomerHome />} />
        <Route path="/underwriterhome" element={<UnderwriterHome />} />
        <Route path="/claimofficerhome" element={<ClaimOfficerHome />} />
      </Routes>
    </Router>
  );
}

export default App;
