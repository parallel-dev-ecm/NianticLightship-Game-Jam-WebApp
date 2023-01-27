import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";

import gsap from "gsap";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function Main_nav() {
  const navigation = useNavigate();
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [logged, set_logged] = useState(false);
  const loginTextRef = useRef();

  useEffect(() => {
    currentUser
      ? (loginTextRef.current.innerText = "Log Out")
      : (loginTextRef.current.innerText = "Log In");
  }, [currentUser]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigation("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <Navbar variant="light" expand="lg">
      <Navbar.Brand style={{ paddingLeft: "10px" }} href="/">
        Ar-tists
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="ml-auto">
        <Nav className="me-auto ">
          <Nav.Link
            className="ml-auto"
            ref={loginTextRef}
            onClick={handleLogout}
            href="#home"
          >
            Log Out
          </Nav.Link>

          <Nav.Link href="/upload-file">Upload File</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Main_nav;
