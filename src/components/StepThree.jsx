import React, { useState } from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useToastModal } from "../contexts/ToastModalContext";
import {
  loading,
  selectProjectName,
  selectStepThreeData,
  setStepThreeData,
} from "../store/dashboardSlice";
import { postData } from "../store/dashboardSlice";
import LoadingButton from "@mui/lab/LoadingButton";

const StepThree = ({ handleChange }) => {
  const stepThreeDataFromStore = useSelector(selectStepThreeData);
  const [answers, setAnswers] = useState(stepThreeDataFromStore);
  const projectName = useSelector(selectProjectName);
  const isLoading = useSelector(loading);

  const dispatch = useDispatch();
  const { triggerToastModal } = useToastModal();

  const handleInputChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], answer: value };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (event) => {
    try {
      const res = await dispatch(
        postData({
          step1: {
            project_name: projectName?.project_name,
          },
          step3: { dynamic_project_questions: answers },
        })
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        dispatch(setStepThreeData(answers));
        handleChange("click", 3);
      } else {
        throw res;
      }
    } catch (err) {
      // Handle error
      console.log(err);
      triggerToastModal(
        "Faild to submit Dynamic Questions and Answers!",
        "error"
      );
    }
  };

  return (
    <div>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Answer Dynamic Questions
        </Typography>
        <Grid container spacing={2}>
          {answers?.map((question, index) => (
            <Grid item xs={14} key={index}>
              <Typography variant="h6" style={{ fontSize: "18px" }}>
                {question.question}
              </Typography>
              <TextField
                fullWidth
                id={`question-${index}`}
                // label={question.question}
                variant="outlined"
                value={question.answer}
                onChange={(e) => handleInputChange(index, e.target.value)}
                // required
              />
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            position: "fixed",
            bottom: 40,
            right: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <LoadingButton
            loadingPosition="start"
            variant="contained"
            onClick={handleSubmit}
            style={{ marginTop: 0, width: "140px" }}
            loading={isLoading}
          >
            Submit
          </LoadingButton>
        </div>
      </Container>
    </div>
  );
};

export default StepThree;
