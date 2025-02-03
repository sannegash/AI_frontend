import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FileClaim from "./pages/FileClaim";
import AccountManagement from "./pages/AccountManagment";
import UnderwriterRequests from "./pages/UnderwriterRequests";
import MakePayment from "./pages/MakePayment";
import ProcessPayment from "./pages/ProcessPayments";
import ProvideData from "./pages/ProvideData";
import RequestUnderwriter from "./pages/RequestUnderwriter";
import RiskAssessment from "./pages/RiskAssessment";
import ViewClaimEstimate from "./pages/ViewClaimEstimate";
import CustomerHome from "./pages/CustomerHome";
import UnderwriterHome from "./pages/UnderwriterHome";
import ClaimOfficerHome from "./pages/ClaimOfficerHome";
import LoggedOutPage from "./pages/LoggedOutPage";
import PrivateRoute from "./components/PrivateRoute";
import CashierHome from "./pages/CashierHome";
import PersonalData  from "./pages/PersonalData";
import VehicleData from "./pages/VehicleData";
import DriverData from "./pages/DriverData";
import Policy from "./pages/Policy";
import ClaimRequests from"./pages/ClaimRequests";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logged-out" element={<LoggedOutPage />} />
        {/* Protected Routes */}
        <Route
          path="/PersonalData"
          element={
            <PrivateRoute>
              <PersonalData/>
            </PrivateRoute>
          }
        />
        <Route
          path="/ClaimRequests"
          element={
            <PrivateRoute>
              <ClaimRequests/>
            </PrivateRoute>
          }
        />
        <Route
          path="/Policy"
          element={
            <PrivateRoute>
              <Policy/>
            </PrivateRoute>
          }
        />
        {/* Protected Routes */}
        <Route
          path="/DriverData"
          element={
            <PrivateRoute>
              <DriverData/>
            </PrivateRoute>
          }
        />
        <Route
          path="/VehicleData"
          element={
            <PrivateRoute>
              <VehicleData/>
            </PrivateRoute>
          }
          />
        
        <Route
          path="/cashierhome"
          element={
            <PrivateRoute>
              <CashierHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/fileclaim"
          element={
            <PrivateRoute>
              <FileClaim />
            </PrivateRoute>
          }
        />
        <Route
          path="/accountmanagement"
          element={
            <PrivateRoute>
              <AccountManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/underwriterrequests"
          element={
            <PrivateRoute>
              <UnderwriterRequests />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/makepayment"
          element={
            <PrivateRoute>
              <MakePayment />
            </PrivateRoute>
          }
        />
        <Route
          path="/processpayment"
          element={
            <PrivateRoute>
              <ProcessPayment />
            </PrivateRoute>
          }
        />
        <Route
          path="/providedata"
          element={
            <PrivateRoute>
              <ProvideData />
            </PrivateRoute>
          }
        />
        <Route
          path="/requestunderwriter"
          element={
            <PrivateRoute>
              <RequestUnderwriter />
            </PrivateRoute>
          }
        />
        <Route
          path="/riskassessment"
          element={
            <PrivateRoute>
              <RiskAssessment />
            </PrivateRoute>
          }
        />
        <Route
          path="/viewclaimestimate"
          element={
            <PrivateRoute>
              <ViewClaimEstimate />
            </PrivateRoute>
          }
        />
        <Route
          path="/customerhome"
          element={
            <PrivateRoute>
              <CustomerHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/underwriterhome"
          element={
            <PrivateRoute>
              <UnderwriterHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/claimofficerhome"
          element={
            <PrivateRoute>
              <ClaimOfficerHome />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

