import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Typography,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import axios from "axios";

const User = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const AdminToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/user?status=all",
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": AdminToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [students]);

  let headers = [
    "First Name",
    "Last Name",
    "Username",
    "Email",
    "Role",
    "Status",
  ];

  // if (userType === "ADMIN" && !headers.includes("Status")) {
  //   headers = [...headers, "Status"];
  // }

  const handleStatusChange = async (studentId, newStatus) => {
    const AdminToken = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/user/update-status/${studentId}`,
        { status: newStatus },
        {
          headers: {
            "x-auth-token": AdminToken,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the student's status locally after successful update
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student._id === studentId
            ? { ...student, status: newStatus }
            : student
        )
      );
    } catch (error) {
      console.error("Error updating student status:", error);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #838797" }}>
      <Table sx={{ backgroundColor: "#111938" }}>
        <TableHead sx={{ backgroundColor: "#192351" }}>
          <TableRow>
            {headers.map((item, i) => (
              <TableCell
                key={i}
                sx={{
                  padding: "1.5em !important",
                  fontFamily: "'Poppins, sans-serif'",
                  color: "#EAC060 !important",
                }}
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
            students.map((student, index) => (
              <TableRow
                key={student._id}
                sx={{
                  backgroundColor: index % 2 === 1 ? "#192351" : "#111938",
                  "& > td": { padding: "10px" },
                }}
              >
                <TableCell className="userTable">{student.firstName}</TableCell>
                <TableCell className="userTable">{student.lastName}</TableCell>
                <TableCell className="userTable">{student.username}</TableCell>
                <TableCell className="userTable">{student.email}</TableCell>
                <TableCell className="userTable">{student.role}</TableCell>
                <TableCell>
                  <Box>
                    <Typography
                      sx={{
                        backgroundColor:
                          student.status === "approved"
                            ? "#28a745"
                            : student.status === "pending"
                            ? "#ffc107"
                            : "#dc3545",
                        color:
                          student.status === "approved"
                            ? "#fff"
                            : student.status === "pending"
                            ? "#212529"
                            : "#fff",
                        maxWidth: "fit-content",
                        borderRadius: "3px",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "10px",
                        fontFamily: '"Poppins", sans-serif',
                        fontWeight: "400",
                        fontStyle: "normal",
                      }}
                    >
                      {student.status}
                      <Box className="apporval">
                        <Select
                          value={student.status}
                          onChange={(e) =>
                            handleStatusChange(student._id, e.target.value)
                          }
                          sx={{
                            color:
                              student.status === "approved"
                                ? "#fff"
                                : student.status === "pending"
                                ? "#212529"
                                : "#fff",
                            borderRadius: "3px",
                            textAlign: "center",
                            padding: "0 !important",
                          }}
                        >
                          {student.status !== "approved" && (
                            <MenuItem value="approved">Approved</MenuItem>
                          )}
                          {student.status !== "pending" && (
                            <MenuItem value="pending">Pending</MenuItem>
                          )}
                          {student.status !== "rejected" && (
                            <MenuItem value="rejected">Rejected</MenuItem>
                          )}
                        </Select>
                      </Box>
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default User;
