import { Box, Button, Stack } from "@mui/material";
import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { REQ_STATUS } from "./components/constants";
import UserRegistrationForm from "./components/UserRegistrationForm";
import useStepper from "./components/useStepper";

const { INIT, LOADING, SUCCESS, ERROR } = REQ_STATUS;

export default function App() {
  const [status, setStatus] = React.useState(INIT);
  const [user, setUser] = React.useState();

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: { city: null, country: null },
      payment: {
        cardNumber: "",
        expiry: null,
        cvv: "",
        billingSameAsShipping: false,
        billingAddress: {
          addressLine: "",
          country: null,
          city: null,
        },
      },
    },
    reValidateMode: "onChange",
  });

  const { handleSubmit, trigger, reset } = methods;

  const handleSave = async (values) => {
    try {
      setStatus(LOADING);
      //register user
      setUser(values);
      setStatus(SUCCESS);
    } catch (err) {
      setStatus(ERROR);
      console.error("err: ", err);
    }
  };

  const [activeStep, setActiveStep, StepperComponent, Navigators] =
    useStepper();

  const validateAllFields = async () => {
    switch (activeStep) {
      case 0: //step 1
        //triggers validation on the specified fields
        return await trigger(["firstName", "lastName", "email", "phoneNumber"]);

      case 1: //step 2 - address
        return await trigger(["address"]);

      case 2: //step 3 - payment method
        return await trigger(["payment"]);

      default:
        return true;
    }
  };

  return (
    <div className="App">
      {status === "success" ? (
        <Stack
          sx={{ height: "100vh" }}
          justifyContent="center"
          alignItems={"center"}
        >
          <Stack
            direction={"column"}
            alignItems="center"
            textTransform={"capitalize"}
          >
            <h3 style={{}}>
              {user?.firstName} {user?.lastName}{" "}
            </h3>
            <h3>User Information Submitted Successfully</h3>
            <Button
              sx={{ mt: 1.5 }}
              onClick={() => {
                setStatus(INIT);
                reset();
                setActiveStep(0);
              }}
            >
              Submit Another User Info
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack p={5}>
          <h3 style={{ textAlign: "center" }}>Information Submission</h3>
          <StepperComponent />
          <FormProvider {...methods}>
            <Box
              component="form"
              autoComplete="off"
              sx={{
                "& .MuiFormLabel-root": {
                  fontSize: "12px",
                  marginBottom: "0px",
                },
                "& .MuiFormHelperText-root": {
                  marginLeft: "0px",
                },
                overflowY: "scroll",
                height: "60vh",
                borderTop: "1px solid #EDEDED",
                padding: "12px",
              }}
            >
              <UserRegistrationForm activeStep={activeStep} />
            </Box>
          </FormProvider>
          <Navigators
            validateAllFields={validateAllFields}
            onClickFinish={handleSubmit(handleSave, (err) =>
              console.error("err", err)
            )}
            status={status}
          />
        </Stack>
      )}
    </div>
  );
}
