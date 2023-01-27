import "./App.css";
import { AuthProvider } from "./contexts/AuthContext.js";
import React from "react";

import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/Login";
import Main_nav from "./Components/Navbar";
import UploadFile from "./Components/UploadFile";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Main_nav />
          <Routes>
            <Route exact element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="upload-file" element={<UploadFile />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
