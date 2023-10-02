import React, { useState } from "react";
import "./screen.css";
import { MdTitle } from "react-icons/md";
import { BiBody } from "react-icons/bi";
import {PiMountainsFill} from 'react-icons/pi'
import { useNavigate, useParams } from "react-router-dom";
export default function EditTask() {
    const Navigate=useNavigate();
    const {_id,Title,Body}=useParams();
    const [newtitle,setTitle]=useState(Title)
    const [newbody,setBody]=useState(Body)
    const[status,setStatus]=useState();
    const handleSubmit=async()=>{
        const token = JSON.parse(localStorage.getItem("Token"));
        const resp = await fetch("http://localhost:8080/api/task/updateTask", {
          method: "PUT",
          body:JSON.stringify({_id,newtitle,newbody,status}),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const result = await resp.json();
        if (result.success) {
          alert(result.message);
          Navigate("/")
        }
      }
  return (
    <>
      <div className="bg">
        <div className="form-container">
          <div className="container form">
          <PiMountainsFill className=" text-center mt-5  fs-4 logo" ></PiMountainsFill>
            <div className="mx-3">
           
              <h4 className="mx-5 fw-bold mt-3 mb-3">EDIT TASK</h4>
            </div>
            <div className="inp d-flex mt-3 mb-3">
              <span className="icon fs-5 mx-2">
                <MdTitle />
              </span>
              <input type="text" placeholder="Title" className="my-3  "  value={newtitle} onChange={(e)=>setTitle(e.target.value)}></input>
              <br />
            </div>
            <div className="inp d-flex my-3">
              <span className="icon fs-5 mx-2">
                <BiBody />
              </span>
              <input
                type="test"
                placeholder="Body"
                className="my-3  "
                value={newbody} onChange={(e)=>setBody(e.target.value)}
              ></input>
              <br />
            </div>
            <div className="inp my-3 d-flex">
            <span className="icon fs-5 mx-2">
                Status
              </span>
                <select  value={status} onChange={(e)=>setStatus(e.target.value)}>
                    <option className="p-2" value="In Progress">In Progress</option>
                    <option className="p-2" value="Completed">Completed</option>
                </select>
            </div>
            <button className="btn my-3 p-2 " onClick={handleSubmit}>EDIT</button>
           
          </div>
        </div>
      </div>
    </>
  );
}
