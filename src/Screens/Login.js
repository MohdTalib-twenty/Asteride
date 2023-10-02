import React, { useState } from "react";
import "./screen.css";
import { BiSolidUser } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import {PiMountainsFill} from 'react-icons/pi'
import { useNavigate } from "react-router-dom";
export default function Login() {
    const Navigate=useNavigate();
    const [username,setName]=useState("")
    const [password,setPassword]=useState("")

    const handleSubmit=async()=>{
      const resp=await fetch("http://localhost:8080/api/auth/login",{
        method:"Post",
        body:JSON.stringify({username,password}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      var result = await resp.json();
      if(result.success){
        localStorage.setItem("Token",JSON.stringify(result.token))
        localStorage.setItem("User",JSON.stringify(result.findUser))
        alert(result.message);
        Navigate("/")
      }else{
        alert(result.message)
      }
    }
  return (
    <>
      <div className="bg">
        <div className="form-container">
          <div className="container form">
          <PiMountainsFill className=" text-center mt-5  fs-4 logo" ></PiMountainsFill>
            <div className="mx-3">
           
              <h4 className="mx-5 fw-bold mt-3 mb-3">LOG IN</h4>
            </div>
            <div className="inp d-flex mt-3 mb-3">
              <span className="icon fs-5 mx-2">
                <BiSolidUser />
              </span>
              <input type="text" placeholder="Name" className="my-3  "  value={username} onChange={(e)=>setName(e.target.value)}></input>
              <br />
            </div>
            <div className="inp d-flex my-3">
              <span className="icon fs-5 mx-2">
                <RiLockPasswordFill />
              </span>
              <input
                type="password"
                placeholder="Password"
                className="my-3  "
                value={password} onChange={(e)=>setPassword(e.target.value)}
              ></input>
              <br />
            </div>
            <button className="btn my-3 p-2 " onClick={handleSubmit}>Login</button>
            <div className="mx-3">
              <p className=" mx-5 fw-bold mt-1 mb-3">New user?<span className="red" onClick={()=>Navigate('/signup')}>Signup</span></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
