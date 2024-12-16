import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import FileClaim from "./pages/FileClaim";
import AccountManagment from "./pages/AccountManagment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/fileclaim" element={<FileClaim />} />
        <Route path="/accountmanagment" element={<AccountManagment />} />
      </Routes>
    </Router>
  );
}

export default App;
