import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  Typography,
  Button,
} from "@mui/material";
import MainContext from "../components/MainContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetState } from "../store/dashboardSlice";

const Dashboard = () => {
  // const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("userName"));
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string" || string.length === 0) {
      return string;
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" style={{ flexGrow: 1, textAlign: "end" }}>
            Requirement Form Bot
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        // open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 0 40px 0",
          }}
        >
          <Typography
            variant="h5"
            style={{ padding: "10px", color: "#1876D1" }}
          >
            {capitalizeFirstLetter(userName)}
          </Typography>
          <List>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/");
                localStorage.clear();
                dispatch(resetState());
              }}
            >
              Logout
            </Button>
          </List>
        </div>
      </Drawer>
      <main style={{ flexGrow: 1, padding: "80px 20px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "80%",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 0px 10px #ddd",
            }}
          >
            <MainContext />
          </div>
        </div>
      </main>
    </div>
  );
};

const drawerWidth = "200px";

export default Dashboard;
