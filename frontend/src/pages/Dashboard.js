import React from "react";
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import logoutImg from "../assets/log out.png"; 
import { useNavigate } from "react-router-dom";
import logo1 from "../assets/logo1.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "180px",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          borderRight: "1px solid #ddd", // Add white border to the right
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          <img src={logo1} alt="pro" style={{ width: 140 }} />
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: "20px" }}>
            <Link
              to="board"
              style={{
                textDecoration: "none",
                color: "black",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              className="nav-link"
            >
              Board
            </Link>
          </li>
          <li style={{ marginBottom: "20px" }}>
            <Link
              to="analytics"
              style={{
                textDecoration: "none",
                color: "black",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              className="nav-link"
            >
              Analytics
            </Link>
          </li>
          <li style={{ marginBottom: "20px" }}>
            <Link
              to="settings"
              style={{
                textDecoration: "none",
                color: "black",
                padding: "10px 20px",
                borderRadius: "5px",
              }}
              className="nav-link"
            >
              Settings
            </Link>
          </li>
          <li>
            <button
              style={{
                marginTop: "120px",
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
              }}
              onClick={handleLogout}
            >
              <img src={logoutImg} alt="logout" style={{ width: "83px", height: "32px",marginTop:"214px",cursor:"pointer" }}  />
            </button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;