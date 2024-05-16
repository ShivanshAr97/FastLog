import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/" element={<Dashboard/>}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
