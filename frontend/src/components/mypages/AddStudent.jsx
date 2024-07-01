import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddStudent() {
  const [fetchCities, setFetchCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addStudentLoading, setAddStudentLoading] = useState(false);
  const [student, setStudent] = useState({
    name: "",
    gender: "",
    degree_level: "",
    roll_no: "",
    state_id: "",
    city_id: "",
    employment_status: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));

    if (name === "state_id") {
      setStudent((prevStudent) => ({
        ...prevStudent,
        city_id: "",
      }));
    }
  };

  const AdminToken = localStorage.getItem("token");
  useEffect(() => {
    const fetchCityWithState = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://127.0.0.1:8000/api/state/with-cities",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": AdminToken,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setFetchCities(data || []);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setFetchCities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCityWithState();
  }, []);

  const handleAddStudent = async () => {
    try {
      setAddStudentLoading(true);
      // Construct the student data object
      const studentData = {
        name: student?.name,
        gender: student?.gender,
        degree_level: student?.degree_level,
        roll_no: student?.roll_no,
        state_id: student?.state_id,
        city_id: student?.city_id,
        employment_status: student?.employment_status,
      };

      // Ensure the AdminToken is defined
      if (!AdminToken) {
        throw new Error("AdminToken is not defined");
      }

      const response = await fetch("http://127.0.0.1:8000/api/student/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": AdminToken,
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setStudent(data);
      if (data.msg === "Student added successfully") {
        alert("Student added successfully");
        toast.success("Student added successfully!");
      }
      resetStudentForm();
    } catch (error) {
      setAddStudentLoading(false);
      console.error("Error fetching student data:", error);
    } finally {
      setAddStudentLoading(false);
    }
  };

  const resetStudentForm = () => {
    setStudent({
      name: "",
      gender: "",
      degree_level: "",
      roll_no: "",
      state_id: "",
      city_id: "",
      employment_status: "",
    });
  };

  const getCitiesForState = (stateId) => {
    const state = fetchCities?.find((state) => state._id === stateId);
    return state ? state.cities : [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddStudent();
  };

  return (
    <Box
      sx={{
        // mt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2016/03/26/13/09/workspace-1280538_1280.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#f9f9f9",
        height: "100%",
        paddingTop: "1em",
        paddingBottom: "2.77em",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#111938",
          paddingInline: "2em",
          paddingBlock: "1em",
          width: "45%",
          textAlign: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          className="userTable"
          sx={{
            color: "#EAC060 !important",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Add Student
        </Typography>
      </Box>
      <div>
        {/* <button onClick={notify}>Notify!</button> */}
        {/* <ToastContainer /> */}
      </div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "100%", maxWidth: 800 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={student.name}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                },
              }}
              variant="outlined" // Use 'outlined' or 'filled' based on your design
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
              select
              value={student.gender}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                  "& .MuiSelect-icon": {
                    color: "#fff", // Color of the arrow icon
                  },
                },
              }}
              variant="outlined"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="degree_level"
              label="Degree Level"
              name="degree_level"
              value={student.degree_level}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="roll_no"
              label="Roll No"
              name="roll_no"
              value={student.roll_no}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="state_id"
              label="State"
              name="state_id"
              select
              value={student.state_id}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                  "& .MuiSelect-icon": {
                    color: "#fff", // Color of the arrow icon
                  },
                },
              }}
              variant="outlined"
            >
              {fetchCities?.map((state) => (
                <MenuItem key={state._id} value={state._id}>
                  {state.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="city_id"
              label="City"
              name="city_id"
              select
              value={student.city_id}
              onChange={handleChange}
              disabled={!student.state_id}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff !important", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                  "&.Mui-disabled": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ccc !important", // Adjust border color for disabled state
                    },
                  },
                  "& .MuiSelect-icon": {
                    color: "#fff", // Color of the arrow icon
                  },
                },
              }}
              variant="outlined"
            >
              {student.state_id &&
                getCitiesForState(student.state_id).map((city) => (
                  <MenuItem key={city._id} value={city._id}>
                    {city.name}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="employment_status"
              label="Employment Status"
              name="employment_status"
              value={student.employment_status}
              onChange={handleChange}
              sx={{
                "& .MuiInputBase-input": {
                  color: "#fff", // Input text color
                  borderColor: "#fff", // Input border color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#fff", // Placeholder color
                },
                "& .MuiInputLabel-root": {
                  color: "#fff !important", // Label color
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff", // Border color for outlined variant
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff", // Hover border color for outlined variant
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff", // Focused border color for outlined variant
                  },
                },
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#111938",
                "&:hover": {
                  backgroundColor: "#111938",
                },
              }}
              className="userTable"
            >
              {addStudentLoading ? (
                <CircularProgress size={24} />
              ) : (
                <Typography
                  sx={{
                    color: "#EAC060",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontStyle: "normal",
                  }}
                >
                  Add Student
                </Typography>
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddStudent;
