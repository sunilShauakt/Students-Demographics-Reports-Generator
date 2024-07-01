import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import Dashboard from "../mypages/Dashboard";
import User from "../mypages/User";
import StudentList from "../mypages/StudentList";
import AddStudent from "../mypages/AddStudent";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import Icon from "../assets/images/monitor.png";
import group from "../assets/images/group.png";
import student from "../assets/images/student.png";
import users from "../assets/images/users.png";
import Students from "../assets/images/students.png";
import dashboard from "../assets/images/dashboard.png";
const drawerWidth = 240;

const Layout = () => {
  const [studentsOpen, setStudentsOpen] = React.useState(false);
  const [sideBarItem, setSideBarItem] = React.useState("dashboard");
  const AdminToken = localStorage.getItem("userType");
  const handleStudentsClick = (value) => {
    setStudentsOpen(!studentsOpen);
    setSideBarItem(value);
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  const handleChangeContent = (value) => {
    setSideBarItem(value);
  };

  return (
    <Box sx={{ display: "flex" }} className="customeDrawer">
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#192351",
          },
        }}
      >
        <Box>
          <Box
            sx={{
              paddingInline: "1em",
              paddingBlock: "1em",
              marginTop: "1em",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setSideBarItem("dashboard")}
          >
            <Box
              component="img"
              src={Icon}
              alt="Image description"
              sx={{ width: "100px" }}
            />
          </Box>
          <Box sx={{ overflow: "auto", justifyContent: "space-between" }}>
            <List>
              <List
                sx={{
                  backgroundColor: sideBarItem === "dashboard" && "#111938",
                }}
              >
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    onClick={() => handleChangeContent("dashboard")}
                  >
                    <ListItemIcon>
                      <Box
                        component="img"
                        src={dashboard}
                        alt="Image description"
                        sx={{ width: "30px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color:
                          sideBarItem === "dashboard" ? "#E9BF60" : "#838797",
                        fontFamily: '"Poppins", sans-serif !important',
                        fontWeight: "700",
                        fontStyle: "normal",
                      }}
                      primary="Dashboard"
                    />
                  </ListItemButton>
                </ListItem>
              </List>
              {AdminToken === "ADMIN" && (
                <ListItem
                  disablePadding
                  sx={{
                    backgroundColor:
                      sideBarItem === "user" ? "#111938" : "#192351",
                  }}
                >
                  <ListItemButton
                    component={Link}
                    onClick={() => handleChangeContent("user")}
                  >
                    <ListItemIcon>
                      <Box
                        component="img"
                        src={users}
                        alt="Image description"
                        sx={{ width: "30px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color: sideBarItem === "user" ? "#E9BF60" : "#838797",
                        fontFamily: '"Poppins", sans-serif !important',
                        fontWeight: "700",
                        fontStyle: "normal",
                      }}
                      primary="Users"
                    />
                  </ListItemButton>
                </ListItem>
              )}
              <ListItem
                disablePadding
                sx={{
                  backgroundColor: sideBarItem === "Students" && "#111938",
                }}
              >
                <ListItemButton onClick={() => handleStudentsClick("Students")}>
                  <ListItemIcon>
                    <Box
                      component="img"
                      src={Students}
                      alt="Image description"
                      sx={{ width: "30px" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color: sideBarItem === "Students" ? "#E9BF60" : "#838797",
                      fontFamily: '"Poppins", sans-serif !important',
                      fontWeight: "700",
                      fontStyle: "normal",
                    }}
                    primary="Students"
                  />
                  {studentsOpen ? (
                    <KeyboardArrowUp
                      style={{
                        color:
                          sideBarItem === "Students" ? "#E9BF60" : "#838797",
                      }}
                    />
                  ) : (
                    <KeyboardArrowDown
                      style={{
                        color:
                          sideBarItem === "Students" ? "#E9BF60" : "#838797",
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
              <Collapse in={studentsOpen} timeout="auto" unmountOnExit>
                <List
                  component="div"
                  disablePadding
                  sx={{
                    backgroundColor:
                      sideBarItem === "StudentList" ? "#111938" : "#192351",
                  }}
                >
                  <ListItemButton
                    component={Link}
                    onClick={() => handleChangeContent("StudentList")}
                    sx={{
                      pl: 4,
                      backgroundColor:
                        sideBarItem === "StudentList" ? "#111938" : "#192351",
                      "&:hover": {
                        backgroundColor:
                          sideBarItem === "StudentList" ? "#111938" : "#192351",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        component="img"
                        src={group}
                        alt="Image description"
                        sx={{ width: "30px" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      sx={{
                        color:
                          sideBarItem === "StudentList" ? "#E9BF60" : "#838797",
                        fontFamily: '"Poppins", sans-serif !important',
                        fontWeight: "700",
                        fontStyle: "normal",
                      }}
                      primary="Student List"
                    />
                  </ListItemButton>
                  {AdminToken === "ADMIN" && (
                    <ListItemButton
                      sx={{
                        pl: 4,
                        backgroundColor:
                          sideBarItem === "studentsAdd" ? "#111938" : "#192351",
                        "&:hover": {
                          backgroundColor:
                            sideBarItem === "studentsAdd"
                              ? "#111938"
                              : "#192351",
                        },
                      }}
                      component={Link}
                      onClick={() => handleChangeContent("studentsAdd")}
                    >
                      <ListItemIcon>
                        <Box
                          component="img"
                          src={student}
                          alt="Image description"
                          sx={{ width: "30px" }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        sx={{
                          color:
                            sideBarItem === "studentsAdd"
                              ? "#E9BF60"
                              : "#838797",
                        }}
                        primary="Add Student"
                      />
                    </ListItemButton>
                  )}
                </List>
              </Collapse>
            </List>
            <Divider />
          </Box>
        </Box>
        <Box sx={{ overflow: "auto" }} onClick={logOut}>
          <List>
            {["Log out"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <Box
                        component="img"
                        src={
                          "https://cdn-icons-png.flaticon.com/512/13168/13168376.png"
                        }
                        alt="Image description"
                        sx={{ width: "40px" }}
                      />
                    ) : (
                      <MailIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText 
                    // className="userTable"
                    sx={{
                      color: "#E9BF60",
                      fontFamily: '"Poppins", sans-serif !important',
                      fontWeight: "700",
                      fontStyle: "normal",
                    }}
                    primary={text}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, marginInline: "2em", marginTop: "1em" }}
      >
        <Box
          sx={{
            backgroundColor: "#192351",
            p: 3,
            borderRadius: "10px",
            marginBottom: "1em",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontWeight: "500",
              fontStyle: "normal",
              color: "#E9BF60",
            }}
          >
            Students Demographics Reports Generator
          </Typography>
        </Box>

        {sideBarItem === "dashboard" && <Dashboard />}
        {sideBarItem === "user" && <User />}
        {sideBarItem === "StudentList" && <StudentList />}
        {sideBarItem === "studentsAdd" && <AddStudent />}
      </Box>
    </Box>
  );
};

export default Layout;
