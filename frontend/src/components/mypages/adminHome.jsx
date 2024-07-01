import React, { useEffect, useState } from "react";

import "../../../src/App.css";
export default function AdminHome({}) {
  //setting state
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  //fetching all user
  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  //deleting user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          getAllUser();
        });
    } else {
    }
  };
  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <div className="auth-wrapper" style={{ height: "auto", marginTop: 50 }}>
      <div className="auth-inner" style={{ width: "fit-content" }}>
        <h3>Welcome Admin</h3>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            style={{
              padding: "8px 32px 8px 32px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{ position: "absolute", right: 10, top: 8, color: "#aaa" }}
          >
            {searchQuery.length > 0
              ? `Records Found ${data.length}`
              : `Total Records ${data.length}`}
          </span>
        </div>
        <table style={{ width: 700 }}>
          <tr style={{ textAlign: "center" }}>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr style={{ textAlign: "center" }}>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td onClick={() => deleteUser(i._id, i.fname)}>Delete</td>
              </tr>
            );
          })}
        </table>

        <button
          onClick={logOut}
          className="btn btn-primary"
          style={{ marginTop: 10 }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
