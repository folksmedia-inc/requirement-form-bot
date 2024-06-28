import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import FinalOutCome from "./FinalOutcome";
import { useSelector } from "react-redux";
import {
  selectProjectName,
  selectStepThreeData,
  selectStepTwoData,
} from "../store/dashboardSlice";

const steps = ["Step 1", "Step 2", "Step 3", "Final Outcome"];

export default function MainContext() {
  const [value, setValue] = useState(0);
  const projectName = useSelector(selectProjectName);
  const stepTwoDataFromStore = useSelector(selectStepTwoData);
  const stepThreeDataFromStore = useSelector(selectStepThreeData);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <StepOne handleChange={handleChange} />;
      case 1:
        return <StepTwo handleChange={handleChange} />;
      case 2:
        return <StepThree handleChange={handleChange} />;
      case 3:
        return <FinalOutCome />;
      default:
        return "Unknown step";
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {steps.map((label, index) => (
            <Tab
              label={label}
              {...(index === value && { "aria-selected": true })}
              disabled={
                (index === 1 && !projectName?.project_name) ||
                (index === 2 && !stepTwoDataFromStore?.length) ||
                (index === 3 && !stepThreeDataFromStore?.length)
              }
            />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>{getStepContent(value)}</Box>
    </Box>
  );
}
