import React from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loading, login, setUserName } from "../store/authSlice";
import { useToastModal } from "../contexts/ToastModalContext";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const { triggerToastModal } = useToastModal();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await dispatch(login({ username, password }));
      if (res?.meta?.requestStatus === "fulfilled") {
        dispatch(setUserName(username));
        triggerToastModal("Login successful", "success");
        navigate("/dashboard");
      } else {
        throw new Error("Login failed");
      }
    } catch (err) {
      triggerToastModal("Login failed", "error");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {/* <Typography variant="h4">Login</Typography> */}
      <Card style={{ width: 600, padding: 30 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <TextField
                label="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            <Box textAlign="center">
              <LoadingButton
                loadingPosition="start"
                type="submit"
                variant="contained"
                loading={isLoading}
                style={{ width: "140px", padding: 10 }}
              >
                Login
              </LoadingButton>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;
