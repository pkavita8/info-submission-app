import {
  Autocomplete,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StyledBox } from "./styles";
import { CITIES_API_URL, COUNTRIES_API_URL, X_API_KEY } from "./constants";

const Address = ({ isBilling = false, disabled = false }) => {
  const { control, setValue } = useFormContext();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const formAttribute = isBilling ? "payment.billingAddress" : "address";

  const fetchCountries = async () => {
    try {
      const response = await fetch(COUNTRIES_API_URL);
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryChange = async (_, newValue) => {
    setValue(`${formAttribute}.country`, newValue, { shouldValidate: true });

    setValue(`${formAttribute}.city`, null); // Reset city selection

    if (newValue?.cca2) {
      try {
        const response = await fetch(
          `${CITIES_API_URL}?country=${newValue.cca2}`,
          {
            headers: {
              "X-Api-Key": X_API_KEY,
            },
          }
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    } else {
      setCities([]);
    }
  };

  return (
    <StyledBox>
      <h4>Address</h4>
      <Stack
        direction={"row"}
        gap={"1.25rem"}
        justifyContent={"space-between"}
        mb={2}
      >
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            Country
          </FormLabel>
          <Controller
            control={control}
            name={`${formAttribute}.country`}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            render={({ field: { value }, fieldState: { error } }) => (
              <Autocomplete
                disabled={disabled}
                size="small"
                fullWidth
                disablePortal
                openOnFocus
                value={value}
                autoSelect
                options={countries}
                getOptionLabel={(option) => option.name?.common}
                getOptionKey={(option) => option.cca2}
                isOptionEqualToValue={(option, value) =>
                  option.cca2 === value.cca2
                }
                onChange={handleCountryChange}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    margin="dense"
                    {...params}
                    error={!!error}
                    helperText={error?.message || " "}
                  />
                )}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel component="legend" required>
            City
          </FormLabel>
          <Controller
            control={control}
            name={`${formAttribute}.city`}
            rules={{
              required: {
                value: true,
                message: "This field is required",
              },
            }}
            render={({ field: { value }, fieldState: { error } }) => (
              <Autocomplete
                disabled={disabled}
                size="small"
                fullWidth
                disablePortal
                openOnFocus
                value={value}
                autoSelect
                options={cities}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.id}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(_, newValue) =>
                  setValue(`${formAttribute}.city`, newValue, {
                    shouldValidate: true,
                  })
                }
                renderInput={(params) => (
                  <TextField
                    size="small"
                    margin="dense"
                    {...params}
                    error={!!error}
                    helperText={error?.message || " "}
                  />
                )}
              />
            )}
          />
        </FormControl>
      </Stack>
    </StyledBox>
  );
};

export default Address;
