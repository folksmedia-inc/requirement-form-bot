import React from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";
import MainContext from "../components/MainContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("userName"));

  return (
    <div style={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, textAlign: "end" }}>
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
          <Typography variant="h6" style={{ padding: "10px" }}>
            {userName}
          </Typography>
          <List>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/");
                localStorage.removeItem("user_tokens");
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
