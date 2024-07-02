import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png.jpeg";
import back from "../../assets/back.png.jpeg";
import axios from "axios";

const Signup = () => {
  const [formValues, setFormValues] = useState({
        name: "",
        email: "", 
        password: "",
        confirmPassword: "",
      });
  const navigate = useNavigate();
  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
      };
      const handleSubmit = async () => {
            console.log("Form Values:", formValues);
            try {
              const response = await axios.post(
                "http://localhost:5000/api/auth/signup",
                {
                  name: formValues.name,
                  email: formValues.email,
                  password: formValues.password,
                  confirmPassword: formValues.confirmPassword,
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
              width: "68%",
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
        <h2 style={{ color: "white", margin: "57px" }}>
          Welcome aboard my friend
        </h2>
        <p style={{ color: "white", margin: "-47px" }}>
          Just a couple of clicks and we start
        </p>
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
        <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
        <form style={{marginLeft:"46px" , marginRight:"75px"}}>
          <input
          name = "name"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Name"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "45px",
              border: "1px solid #ccc",
              borderRadius: "7px",
            }}
          />
          <input
          name = "email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              border: "1px solid #ccc",
              borderRadius: "7px",
            }}
          />
          <input
         type="email"
         value={formValues.email}
         onChange={handleInputChange}
         placeholder="Email"
         style={{
           width: "100%",
           padding: "12px",
           marginTop: "20px",
           border: "1px solid #ccc",
           borderRadius: "7px",
         }}
       />
       <input
       name = "password"
         type="password"
         value={formValues.password}
         onChange={handleInputChange}
         placeholder="Password"
         style={{
           width: "100%",
           padding: "12px",
           marginTop: "20px",
           border: "1px solid #ccc",
           borderRadius: "7px",
         }}
       />
       <input
         type="password"
         name = "confirmPassword"
         value={formValues.confirmPassword}
         onChange={handleInputChange}
         placeholder="Confirm Password"
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
           backgroundColor: "#17A2B8",
           color: "white",
           border: "none",
           borderRadius: "23px",
           cursor: "pointer",
           marginTop: "24px",
         }}
         onClick={handleSubmit}
       >
         Sign Up
       </button>
       <p
         style={{
           marginTop: "45px",
           textAlign: "center",
         }}
       >
         Already have an account?
       </p>
       <button
         style={{
           width: "100%",
           padding: "12px",
           margin: "2px",
           color: "#17A2BB",
           borderColor: "#17A2BB",
           borderRadius: "23px",
           cursor: "pointer",
         }}
         onClick={() => navigate("/")}
       >
         Login
       </button>
     </form>
   </div>
 </div>
);
};

export default Signup;