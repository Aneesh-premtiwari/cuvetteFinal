import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Analytics.css";

const Analytics = () => {
  const [allData, setAllData] = useState([]);

  const getApiData = async () => {
    try {
      const p = await axios.get("http://localhost:5000/api/", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      const dddd = p.data;
      setAllData(dddd);
    } catch {
      console.log("got an error");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <div className="container">
      <h4 className="title">Analytics</h4>

      <div className="stats" style={{display:"flex" }}>
        <ul className="list blue-border">
          <li >
            Backlog Tasks :
            <span style={{ display: "flex" , justifyContent:"flex-end" ,marginTop:"-20px",position:"relative" , right:"44px"}}>
              {allData.filter((v, i) => v.status == "backlog").length}
            </span>
          </li>
          <li>
            To-Do Tasks :
            <span style={{ display: "flex", justifyContent: "flex-end" ,position:"relative" , right:"44px" , marginTop:"-17px"}}> {allData.filter((v, i) => v.status == "todo").length}</span>
          </li>
          <li>
            In-Progress Tasks :{" "}
            <span style={{ display: "flex", justifyContent: "flex-end" ,position:"relative" , right:"44px" , marginTop:"-17px"}}> {allData.filter((v, i) => v.status == "inprogress").length}</span>
          </li>
          <li>
            Completed Tasks :{" "}
            <span style={{ display: "flex", justifyContent: "flex-end",position:"relative" , right:"44px" , marginTop:"-17px" }}> 
            {allData.filter((v, i) => v.status == "done").length}</span>
          </li>
        </ul>
        <ul className="list blue-border">
          <li >
            Low Priority :
            <span style={{ display: "flex" , justifyContent:"flex-end" ,marginTop:"-20px",position:"relative" , right:"44px"}}>
              {allData.filter((v, i) => v.status == "lowPriority").length}
            </span>
          </li>
          <li>
            Moderate Priority :
            <span style={{ display: "flex", justifyContent: "flex-end" ,position:"relative" , right:"44px" , marginTop:"-17px"}}> {allData.filter((v, i) => v.status == "moderatePriority").length}</span>
          </li>
          <li>
            High priority :{" "}
            <span style={{ display: "flex", justifyContent: "flex-end" ,position:"relative" , right:"44px" , marginTop:"-17px"}}> {allData.filter((v, i) => v.status == "highpriority").length}</span>
          </li>
          <li>
            Due Date Tasks :{" "}
            <span style={{ display: "flex", justifyContent: "flex-end",position:"relative" , right:"44px" , marginTop:"-17px" }}> 
            {allData.filter((v, i) => v.status == "duedate").length}</span>
          </li>
        </ul>
        
      </div>
      
    </div>
  );
};

export default Analytics;