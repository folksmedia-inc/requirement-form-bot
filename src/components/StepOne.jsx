import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { loading, postData, selectProjectName } from "../store/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { useToastModal } from "../contexts/ToastModalContext";
import LoadingButton from "@mui/lab/LoadingButton";
import { loginLoading } from "../store/authSlice";

const StepOne = ({ handleChange }) => {
  const projectNameFromStore = useSelector(selectProjectName);
  const [projectName, setProjectName] = React.useState(
    projectNameFromStore?.project_name
  );
  const dispatch = useDispatch();
  const { triggerToastModal } = useToastModal();
  const isLoading = useSelector(loading);
  const isLoginLoading = useSelector(loginLoading);

  const handleSubmit = async () => {
    try {
      const res = await dispatch(
        postData({
          step1: {
            project_name: projectName,
          },
        })
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        handleChange("click", 1);
      } else {
        throw res;
      }
    } catch (err) {
      console.log(err);
      if (err?.error?.message === "401") {
        handleSubmit();
      } else {
        triggerToastModal("Faild to submit Project Name!", "error");
      }
    }
  };

  return (
    <Card>
      <CardContent
        style={{ display: "flex", flexDirection: "column", gap: 15 }}
      >
        <Typography variant="h6">Project Name</Typography>
        <TextField
          style={{ width: "400px" }}
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <LoadingButton
          style={{ width: "400px", padding: 10 }}
          variant="contained"
          onClick={handleSubmit}
          disabled={projectName === ""}
          loading={isLoading || isLoginLoading}
        >
          Submit
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default StepOne;
