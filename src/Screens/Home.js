import React, { useEffect, useState } from "react";
import "./screen.css";
import { GrEdit } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const Navigate = useNavigate();
  const [user, setUser] = useState("");
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    const token = JSON.parse(localStorage.getItem("Token"))
    const resp = await fetch("http://localhost:8080/api/task/getTask", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await resp.json();
    if (result.success) {
      console.log();
      setTasks(result.tasks);
    }
  };
  const handleUpdate = async (_id) => {
    const token = JSON.parse(localStorage.getItem("Token"))
    const resp = await fetch("http://localhost:8080/api/task/updateStatus", {
      method: "PUT",
      body: JSON.stringify({ _id }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await resp.json();
    if (result.success) {
      alert(result.message);
      Navigate("/");
    }
  };
  const handleTask = (_id, Title, Body) => {
    Navigate(`/edit/${_id}/${Title}/${Body}`);
  };
  const handleDelete=async(_id)=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    const resp = await fetch(`http://localhost:8080/api/task/deleteTask/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result = await resp.json();
    if (result.success) {
      alert(result.message);
      Navigate("/");
    }
  }
  useEffect(() => {
    const t = JSON.parse(localStorage.getItem("User"));
    if (t) {
      setUser(t);
    }
    fetchTasks();
  }, []);
  return (
    <>
      <div className="bg">
        <div className="form-container">
          {user ? (
            <>
              <div className="form-task">
                <h4 className="text-center fw-bold  my-5">Task List</h4>

                {tasks.map((task, idx) => {
                  return (
                    <>
                      <div className="task my-2">
                        <div className="container d">
                          <div className="row">
                            <div className="col-7">
                              <h3 className="fw-bold">{task.title}</h3>
                              <p className="my-2">{task.body}</p>
                            </div>
                            <div className="col-5 d-flex">
                              <div>
                                <h4>Status</h4>
                                <p className="my-2">{task.status}</p>
                              </div>
                              {task.status === "In Progress" && (
                                <>
                                  <div className="mx-4">
                                    <h4>Marked as</h4>
                                    <button
                                      className="my-2 btn st"
                                      onClick={() => handleUpdate(task._id)}
                                    >
                                      Completed
                                    </button>
                                  </div>
                                </>
                              )}
                              <h3>
                                <GrEdit
                                  className="edit"
                                  onClick={() =>
                                    handleTask(task._id, task.title, task.body)
                                  }
                                />
                              </h3>
                              <h3>
                                <AiFillDelete
                                  className="edit"
                                  onClick={()=>handleDelete(task._id)}
                                />
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="my-4">
                  <button className="btn" onClick={() => Navigate("/add")}>
                    Add Task
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="form-task">
                <h3 className="text-center text-white">Login first</h3>
                <div className="my-4">
                  <button className="btn" onClick={() => Navigate("/login")}>
                    Click Me
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
