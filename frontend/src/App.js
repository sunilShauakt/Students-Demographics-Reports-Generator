import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Register";
import UserDetails from "./components/pages/SideBar";
import Navbar from "./components/mypages/Navbar";
// import AdminHome from "./components/mypages/adminHome";
import AdminData from "./components/pages/AdminData";
import About from "./components/mypages/About";
import ProtectedRoute from "./components/mypages/ProtectedRoute";
import StudentList from "./components/mypages/StudentList";
import AddStudent from "./components/mypages/AddStudent";
import Dashboard from "./components/mypages/Dashboard";
import User from "./components/mypages/User";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn"); // Check if logged in
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []); // Empty dependency array to run only once on mount

  return (
    <Router>
      <div className="App">
        {/* <Navbar isLoggedIn={isLoggedIn} userType={userType} /> */}
        <Routes>
          {/* unauthorized route */}
          {!isLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/" element={<Login />} />
            </>
          )}

          {/* ProtectedRoutes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
            {userType !== "ADMIN" ? (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin-dashboard" element={<AdminData />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/userDetails" element={<Navigate to="/" />} />
                <Route path="/products" element={<Navigate to="/" />} />
                <Route path="/admin-dashboard" element={<AdminData />} />
                <Route path="/students/list" element={<StudentList />} />
                <Route path="students/add" element={<AddStudent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user" element={<User />} />
              </>
            )}
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
