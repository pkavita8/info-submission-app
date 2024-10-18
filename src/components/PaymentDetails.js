import {
  Checkbox,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Address from "./Address";
import { StyledBox } from "./styles";
import { cardNumberRegex, cvvRegex } from "./constants";


const PaymentDetails = () => {
  const { control, setValue, getValues, watch } = useFormContext();

  const isbillingSameAsShipping = watch("payment.billingSameAsShipping");

  return (
    <StyledBox>
      <h4>Payment Details</h4>

      <FormControl fullWidth>
        <FormLabel component="legend" required>
          Card Number
        </FormLabel>
        <Controller
          control={control}
          name="payment.cardNumber"
          rules={{
            required: {
              value: true,
              message: "This field is required",
            },
            pattern: {
              value: cardNumberRegex,
              message: "Please enter a valid card number",
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
      <Stack
        direction={"row"}
        gap={"1.25rem"}
        justifyContent={"space-between"}
        my={2}
      >
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            Expiry
          </FormLabel>
          <Controller
            control={control}
            name="payment.expiry"
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  views={["year", "month"]}
                  value={value}
                  onChange={onChange}
                  sx={{
                    marginTop: "8px",
                    "& .MuiInputBase-input": {
                      padding: "8.5px 14px",
                    },
                  }}
                  required
                />
              </LocalizationProvider>
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            CVV
          </FormLabel>
          <Controller
            control={control}
            name="payment.cvv"
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
              pattern: {
                value: cvvRegex,
                message: "Please enter valid CVV",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                size="small"
                margin="dense"
                type="number"
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
      <Typography my={1}>Billing Address</Typography>
      <FormControl fullWidth>
        <Controller
          name="payment.billingSameAsShipping"
          control={control}
          render={({ field: { value } }) => (
            <Stack direction={"row"} alignItems={"center"} mb={2}>
              <Checkbox
                checked={value}
                onChange={(event) => {
                  setValue(
                    "payment.billingSameAsShipping",
                    event.target.checked
                  );
                  if (event.target.checked) {
                    const { country, city } = getValues("address");
                    setValue("payment.billingAddress.country", country);
                    setValue("payment.billingAddress.city", city);
                  }
                }}
                size="small"
              />
              <FormLabel focused={false}>Same as Shipping Address</FormLabel>
            </Stack>
          )}
        />
        <Address isBilling disabled={isbillingSameAsShipping} />
      </FormControl>
    </StyledBox>
  );
};

export default PaymentDetails;
