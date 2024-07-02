import React from "react";
import {
  TextField,
  Card,
  CardContent,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login, loginLoading } from "../store/authSlice";
import { useToastModal } from "../contexts/ToastModalContext";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(loginLoading);
  const { triggerToastModal } = useToastModal();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await dispatch(login({ username, password }));
      if (res?.meta?.requestStatus === "fulfilled") {
        localStorage.setItem("userName", JSON.stringify(username));
        triggerToastModal("Login successful", "success");
        navigate("/dashboard");
      } else {
        throw res;
      }
    } catch (err) {
      triggerToastModal(err?.payload?.detail || "Login failed", "error");
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
