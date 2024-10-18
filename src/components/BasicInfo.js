import { FormControl, FormLabel, Stack, TextField } from "@mui/material";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyledBox } from './styles';
import { emailRegex, nameregex, phoneRegex } from "./constants";

const BasicInfo = () => {
  const { control } = useFormContext();

  return (
    <StyledBox>
      <h4>Basic Info</h4>
      <Stack
        direction={"row"}
        gap={"1.25rem"}
        justifyContent={"space-between"}
        my={2}
      >
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            First Name
          </FormLabel>
          <Controller
            name="firstName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: nameregex,
                message: "Only alphabets, fullstop and spaces are allowed",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                margin="dense"
                value={value}
                onChange={onChange}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            Last Name
          </FormLabel>
          <Controller
            name="lastName"
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: nameregex,
                message: "Only alphabets, fullstop and spaces are allowed",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                margin="dense"
                value={value}
                onChange={onChange}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>
      </Stack>
      <Stack
        direction={"row"}
        gap={"1.25rem"}
        justifyContent={"space-between"}
        mb={2}
      >
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            Email
          </FormLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                margin="dense"
                value={value}
                onChange={onChange}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel component="legend">Phone</FormLabel>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              pattern: {
                value: phoneRegex,
                message: "Please enter a valid phone number",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                type="number"
                margin="dense"
                value={value}
                onChange={onChange}
                fullWidth
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
        </FormControl>
      </Stack>
    </StyledBox>
  );
};

export default BasicInfo;
