import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";
import remove from "../assets/images/delete.png";
import downloadstudents from "../assets/images/download.png";
import editStudent from "../assets/images/edituser.png";
import downloadAll from "../assets/images/downloadAll.png";
import { Link } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editedStudentData, setEditedStudentData] = useState({});
  const AdminToken = localStorage.getItem("token");

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/student", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": AdminToken,
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching student data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleRemoveStudent = async (studentId) => {
    const AdminToken = localStorage.getItem("token");
    const url = `http://127.0.0.1:8000/api/student/remove/${studentId}`;
    const headers = {
      "x-auth-token": AdminToken,
    };

    try {
      const response = await axios.delete(url, { headers });
      console.log("Student removed successfully:", response.data);
      setStudents(students.filter((student) => student._id !== studentId));
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };

  const handleDownloadStudent = async (studentId) => {
    try {
      const AdminToken = localStorage.getItem("token");
      const url = `http://127.0.0.1:8000/api/report/download/${studentId}`;
      const headers = {
        "x-auth-token": AdminToken,
      };

      const response = await axios.get(url, {
        headers,
        responseType: "blob", // Important for handling binary data
      });

      // Create a link element to trigger the download
    } catch (error) {
      console.error("Error downloading student data:", error);
    }
  };

  const handleEditStudent = (student) => {
    setEditStudentId(student._id);
    setEditedStudentData({
      name: student.name,
      gender: student.gender,
      degree_level: student.degree_level,
      roll_no: student.roll_no,
      state_id: student.state_id?._id,
      city_id: student.city_id?._id,
      employment_status: student.employment_status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8000/api/student/update/${editStudentId}`;
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": AdminToken,
    };

    try {
      const response = await axios.put(url, editedStudentData, { headers });
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === editStudentId ? response.data : student
        )
      );
      setEditStudentId(null);
      setEditedStudentData({});
      fetchStudents();
      alert(response?.data?.msg);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  let headers = [
    "Name",
    "Gender",
    "Degree Level",
    "Roll No",
    "State",
    "City",
    "Employment Status",
    "Generate",
  ];

  const userType = localStorage.getItem("userType");

  if (
    userType === "ADMIN" &&
    (!headers.includes("Delete Student") || !headers.includes("Edit Student"))
  ) {
    headers = [...headers, "Delete Student", "Edit Student"];
  }

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #838797" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#111938",
          padding: "13px",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "#EAC060" }}>Download All</Typography>
        <Link to={"http://127.0.0.1:8000/api/report/download"}>
          <Box
            component="img"
            src={downloadAll}
            alt="Download All"
            sx={{ width: "40px", filter: "invert(1)" }}
          />
        </Link>
      </Box>
      <Table sx={{ backgroundColor: "#111938" }}>
        <TableHead sx={{ backgroundColor: "#192351" }}>
          <TableRow>
            {headers.map((item, i) => (
              <TableCell
                key={i}
                sx={{ color: "#EAC060 !important" }}
                className="userTable"
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={headers.length} align="center">
                <CircularProgress style={{ color: "#EAC060" }} />
              </TableCell>
            </TableRow>
          ) : (
            students.map((student, i) => (
              <TableRow
                key={student._id}
                sx={{
                  backgroundColor: i % 2 === 1 ? "#192351" : "#111938",
                  "& > td": { padding: "1.7em !important" },
                }}
              >
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="name"
                      value={editedStudentData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    student.name
                  )}
                </TableCell>
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="gender"
                      value={editedStudentData.gender}
                      onChange={handleChange}
                    />
                  ) : (
                    student.gender
                  )}
                </TableCell>
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="degree_level"
                      value={editedStudentData.degree_level}
                      onChange={handleChange}
                    />
                  ) : (
                    student.degree_level
                  )}
                </TableCell>
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="roll_no"
                      value={editedStudentData.roll_no}
                      onChange={handleChange}
                    />
                  ) : (
                    student.roll_no
                  )}
                </TableCell>
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="state_id"
                      value={editedStudentData.state_id}
                      onChange={handleChange}
                    />
                  ) : student.state_id ? (
                    student.state_id.name
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="city_id"
                      value={editedStudentData.city_id}
                      onChange={handleChange}
                    />
                  ) : student.city_id ? (
                    student.city_id.name
                  ) : (
                    "N/A"
                  )}
                </TableCell>
                <TableCell className="userTable">
                  {editStudentId === student._id ? (
                    <TextField
                      name="employment_status"
                      value={editedStudentData.employment_status}
                      onChange={handleChange}
                    />
                  ) : (
                    student.employment_status
                  )}
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleDownloadStudent(student?._id)}
                >
                  <Box
                    component="img"
                    src={downloadstudents}
                    alt="Download"
                    sx={{ width: "30px", filter: "invert(1)" }}
                  />
                </TableCell>
                {userType === "ADMIN" && (
                  <>
                    {editStudentId !== student._id && (
                      <TableCell
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleRemoveStudent(student?._id)}
                      >
                        <Box
                          component="img"
                          src={remove}
                          alt="Remove"
                          sx={{ width: "25px", filter: "invert(1)" }}
                        />
                      </TableCell>
                    )}
                    {editStudentId !== student._id && (
                      <TableCell
                        sx={{
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditStudent(student)}
                      >
                        <Box
                          component="img"
                          src={editStudent}
                          alt="Edit"
                          sx={{ width: "25px", filter: "invert(1)" }}
                        />
                      </TableCell>
                    )}
                    {editStudentId === student._id && (
                      <TableCell colSpan={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "13px",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateStudent}
                          >
                            Save
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setEditStudentId(null)}
                          >
                            Cancel
                          </Button>
                        </Box>
                      </TableCell>
                    )}
                  </>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentList;
