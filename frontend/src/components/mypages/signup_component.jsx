import React, { useState } from "react";
import "../../../src/App.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
export default function SignUp() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    usrName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: formData.fname,
        lastName: formData.lname,
        username: formData.usrName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        response.token &&
          Swal.fire({
            title: "Registration Successful",
            text: "",
            icon: "success",
          });

        if (response.token) {
          localStorage.setItem("AdminToken", response.token);
          localStorage.setItem("role", formData.role);
        } else {
          Swal.fire({
            title: "Something went wrong: ",
            text: "",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Register</h3>
          <div>
            Register As
            <input
              type="radio"
              name="role"
              value="USER"
              onChange={handleChange}
            />
            User
            <input
              type="radio"
              name="role"
              value="ADMIN"
              onChange={handleChange}
            />
            Admin
          </div>
          {/* {userType === "Admin" ? (
            <div className="mb-3">
              <label>Secret Key</label>
              <input
                type="text"
                className="form-control"
                placeholder="Secret Key"
                onChange={(e) => setSecretKey(e.target.value)}
              />
            </div>
          ) : null} */}

          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>user Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="user name"
              name="usrName"
              value={formData.usrName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login?</a>
          </p>
        </form>
      </div>
    </div>
  );
}
