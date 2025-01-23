import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Import your auth context
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
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route
            path="/fileclaim"
            element={<ProtectedRoute component={FileClaim} />}
          />
          <Route
            path="/accountmanagement"
            element={<ProtectedRoute component={AccountManagment} />}
          />
          <Route
            path="/underwriterrequests"
            element={<ProtectedRoute component={UnderwriterRequests} />}
          />
          <Route
            path="/claimapproval"
            element={<ProtectedRoute component={ClaimApproval} />}
          />
          <Route
            path="/makepayment"
            element={<ProtectedRoute component={MakePayment} />}
          />
          <Route
            path="/processpayment"
            element={<ProtectedRoute component={ProcessPayment} />}
          />
          <Route
            path="/providedata"
            element={<ProtectedRoute component={ProvideData} />}
          />
          <Route
            path="/requestunderwriter"
            element={<ProtectedRoute component={RequestUnderwriter} />}
          />
          <Route
            path="/riskassesment"
            element={<ProtectedRoute component={RiskAssessment} />}
          />
          <Route
            path="/viewclaimestimate"
            element={<ProtectedRoute component={ViewClaimEstimate} />}
          />
          <Route
            path="/customerhome"
            element={<ProtectedRoute component={CustomerHome} />}
          />
          <Route
            path="/underwriterhome"
            element={<ProtectedRoute component={UnderwriterHome} />}
          />
          <Route
            path="/claimofficerhome"
            element={<ProtectedRoute component={ClaimOfficerHome} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


