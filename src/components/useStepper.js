import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  Button,
  CircularProgress,
  Step,
  StepButton,
  Stepper,
} from "@mui/material";
import * as React from "react";
import { StepperWrapper } from "./styles";

export default function useStepper() {
  const steps = Array.from({ length: 4 }, (_, index) => index + 1);

  const [activeStep, setActiveStep] = React.useState(0);

  const totalSteps = steps.length;

  const isLastStep = activeStep === totalSteps - 1;

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const StepperComponent = () => {
    return (
      <StepperWrapper>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={
            <KeyboardArrowRightIcon color={"secondary"} fontSize="small" />
          }
        >
          {steps.map((step, index) => {
            return (
              <Step key={step}>
                <StepButton />
              </Step>
            );
          })}
        </Stepper>
      </StepperWrapper>
    );
  };

  const Navigators = ({ validateAllFields, onClickFinish, status }) => {
    const onClickNext = async () => {
      if (validateAllFields) {
        const canProceed = await validateAllFields();
        if (canProceed) handleNext();
      }
    };

    if (status === "success") return null;
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          borderTop: "1px solid #EDEDED",
          py: 2,
        }}
      >
        <Button
          disabled={activeStep === 0 || isLastStep}
          onClick={handleBack}
          startIcon={<ArrowBackIosIcon />}
        >
          Prev
        </Button>
        <Box />

        <Button
          onClick={() => {
            if (isLastStep) onClickFinish();
            else onClickNext();
          }}
          sx={{ mr: "1.25rem" }}
          endIcon={
            status === "loading" ? (
              <CircularProgress color="primary" size={16} />
            ) : (
              <ArrowForwardIosIcon />
            )
          }
        >
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </Box>
    );
  };
  return [activeStep,setActiveStep, StepperComponent, Navigators];
}
