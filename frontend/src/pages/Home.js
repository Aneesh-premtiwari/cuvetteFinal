import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import back from "../assets/back.png";
import axios from "axios";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          "Content-Type": "application/json",
        }
      );
      console.log(response.data);
      localStorage.setItem("email", response?.data?.email);
      localStorage.setItem("name", response?.data?.name);
      localStorage.setItem("token", response?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting data:", error);
      navigate("/");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#17A2B8",
          padding: "40px",
          color: "white",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            src={back}
            alt="back"
            style={{
              width: "78%",
              height: "auto",
            }}
          />
          <img
            src={logo}
            alt="logo"
            style={{
              position: "absolute",
              top: "60%",
              left: "33%",
              transform: "translate(-50%, -50%)",
              width: "97%",
              height: "auto",
             
              borderRadius: "10px", // Add a rounded corner to the logo
            }}
          />
        </div>
        <h2 style={{ color: "white", margin:"57px" }}>Welcome aboard my friend</h2>
        <p style={{ color: "white", margin:"-47px" }}>Just a couple of clicks and we start</p>
      </div>
      <div
        style={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Login</h2>
        <form>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "45px",
              border: "1px solid #ccc",
              borderRadius: "7px",
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              border: "1px solid #ccc",
              borderRadius: "7px",
            }}
          />
          <button
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor:"#17A2B8" ,
              color: "white",
              border: "none",
              borderRadius: "23px",
              cursor: "pointer",
              marginTop: "24px",
            }}
            onClick={handleLogin}
          >
            Login
          </button>
          <p
            style={{
              marginTop: "45px",
              textAlign: "center",
            }}
          >
           Have no account yet?
          </p>
          <button
            style={{
              width: "100%",
              padding: "12px",
             margin:"2px",
             color: "#17A2BB",
              // border: "none",
              borderRadius: "23px",
              cursor: "pointer",
              borderColor:"#17A2BB",
             
            }}
            onClick={()=> navigate("/signup")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;