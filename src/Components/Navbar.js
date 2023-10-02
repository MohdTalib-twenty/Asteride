import React, { useEffect, useState } from "react";
import "./component.css";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const [user, setUser] = useState("");
  const Navigate=useNavigate();
  useEffect(() => {
    var x = JSON.parse(localStorage.getItem("User"));
    if (x) {
      setUser(x);
    }
  }, []);
  const handlelogout=()=>{
    localStorage.removeItem("User")
    Navigate("/login")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            TASK-MANAGER
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      {user.username}
                    </a>
                  </li>
                  <li className="nav-item my-1">
                    <button className="btn p-2  " onClick={handlelogout}>
                      LOGOUT
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item my-1">
                    <button className="btn p-2  " onClick={()=>Navigate("/login")}>
                      LOGIN
                    </button>
                  </li>
                  <li className="nav-item my-1">
                    <button className="btn p-2  " onClick={()=>Navigate("/signup")}>
                      SIGNUP
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
