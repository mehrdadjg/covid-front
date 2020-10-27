import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setProfile } from "../actions/business";

import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default function Profile() {
  const dispatcher = useDispatch();
  const auth = useSelector((state) => state.auth);
  const business = useSelector((state) => state.business);

  const [businessName, setBusinessName] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const handleBusinessNameChange = (event) => {
    event.persist();
    setBusinessName(() => ({
      value: event.target.value,
      error: false,
      helper: "",
    }));
  };

  const [businessType, setBusinessType] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const handleBusinessTypeChange = (event) => {
    event.persist();
    setBusinessType(() => ({
      value: event.target.value,
      error: false,
      helper: "",
    }));
  };

  const [address1, setAddress1] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const handleAddress1Change = (event) => {
    event.persist();
    setAddress1(() => ({
      value: event.target.value,
      error: false,
      helper: "",
    }));
  };

  const [address2, setAddress2] = useState({ value: "" });
  const handleAddress2Change = (event) => {
    event.persist();
    setAddress2(() => ({
      value: event.target.value,
    }));
  };

  const [city, setCity] = useState({ value: "", error: false, helper: "" });
  const handleCityChange = (event) => {
    event.persist();
    setCity(() => ({
      value: event.target.value,
      error: false,
      helper: "",
    }));
  };

  const [province, setProvince] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const handleProvinceChange = (event) => {
    event.persist();
    setProvince(() => ({
      value: event.target.value,
      error: false,
      helper: "",
    }));
  };

  const [postalCode, setPostalCode] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const isValidPostalCode = (postalCode) => {
    const digits = "0123456789";
    const alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < postalCode.length; i++) {
      if (i % 2 === 0) {
        if (!alph.includes(postalCode.charAt(i).toUpperCase())) {
          return false;
        }
      } else {
        if (!digits.includes(postalCode.charAt(i).toUpperCase())) {
          return false;
        }
      }
    }
    return true;
  };
  const handlePostalCodeChange = (event) => {
    event.persist();
    if (isValidPostalCode(event.target.value)) {
      setPostalCode(() => ({
        value: event.target.value.toUpperCase(),
        error: false,
        helper: "",
      }));
    }
  };

  const [phoneNumber, setPhoneNumber] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const inNumber = (num) => {
    const digits = "0123456789";
    for (let i = 0; i < num.length; i++) {
      if (!digits.includes(num.charAt(i))) {
        return false;
      }
    }
    return true;
  };
  const beautifyPhoneNumber = (phoneNumber) => {
    let n = phoneNumber.trim().length;
    if (n < 3) return phoneNumber;
    else if (n === 3) return `(${phoneNumber}) `;
    else if (n < 6)
      return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3)}`;
    else if (n === 6)
      return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(3)} `;
    else
      return `(${phoneNumber.substring(0, 3)}) ${phoneNumber.substring(
        3,
        6
      )} ${phoneNumber.substring(6)}`;
  };
  const extractPhoneNumber = (beatifulPhoneNumber) => {
    let result = "";
    for (let i = 0; i < beatifulPhoneNumber.length; i++) {
      let ch = beatifulPhoneNumber.charAt(i);
      if (ch !== " " && ch !== "(" && ch !== ")") {
        result += ch;
      }
    }
    return result;
  };
  const handlePhoneNumberChange = (event) => {
    event.persist();
    let phoneNumber = extractPhoneNumber(event.target.value);
    if (inNumber(phoneNumber)) {
      setPhoneNumber(() => ({
        value: phoneNumber,
        error: false,
        helper: "",
      }));
    }
  };

  const [preferredTime, setPreferredTime] = useState({
    value: "",
    error: false,
    helper: "",
  });
  const handlePreferredTimeChange = (event) => {
    event.persist();
    setPreferredTime(() => ({
      value: event.target.value,
      error: false,
      helper: "",
    }));
  };

  const [submissionMessage, setSubmissionMessage] = useState({ value: "" });
  const handleSubmissionMessageChange = (event) => {
    event.persist();
    setSubmissionMessage(() => ({
      value: event.target.value,
    }));
  };

  useEffect(() => {
    if (business.profile) {
      setBusinessName((old) => ({
        ...old,
        value: business.profile.businessName,
      }));
      setBusinessType((old) => ({
        ...old,
        value: business.profile.businessType,
      }));
      setAddress1((old) => ({ ...old, value: business.profile.address1 }));
      setAddress2((old) => ({ ...old, value: business.profile.address2 }));
      setCity((old) => ({ ...old, value: business.profile.city }));
      setProvince((old) => ({ ...old, value: business.profile.province }));
      setPostalCode((old) => ({ ...old, value: business.profile.postalCode }));
      setPhoneNumber((old) => ({
        ...old,
        value: business.profile.phoneNumber,
      }));
      setPreferredTime((old) => ({
        ...old,
        value: business.profile.preferredTime,
      }));
      setSubmissionMessage((old) => ({
        ...old,
        value: business.profile.submissionMessage,
      }));
    }
  }, [business.profile]);

  const [submitStatus, setSubmitStatus] = useState({
    value: "",
    waiting: false,
  });

  const inputsAreValid = () => {
    let valid = true;

    if (businessName.value === "") {
      setBusinessName((old) => ({
        ...old,
        error: true,
        helper: "Business name cannot be empty.",
      }));
      valid = false;
    } else if (businessName.value.length < 3) {
      setBusinessName((old) => ({
        ...old,
        error: true,
        helper: "Business name is too short.",
      }));
      valid = false;
    }

    if (businessType.value === "") {
      setBusinessType((old) => ({
        ...old,
        error: true,
        helper: "Business type cannot be empty.",
      }));
      valid = false;
    } else if (![0, 1, 100].includes(businessType.value)) {
      setBusinessType((old) => ({
        ...old,
        error: true,
        helper: "Business type is invalid.",
      }));
      valid = false;
    }

    if (address1.value === "") {
      setAddress1((old) => ({
        ...old,
        error: true,
        helper: "Address cannot be empty.",
      }));
      valid = false;
    }

    if (city.value === "") {
      setCity((old) => ({
        ...old,
        error: true,
        helper: "City cannot be empty.",
      }));
      valid = false;
    }

    if (province.value === "") {
      setProvince((old) => ({
        ...old,
        error: true,
        helper: "Province cannot be empty.",
      }));
      valid = false;
    } else if (
      ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].includes(province.value)
    ) {
      setProvince((old) => ({
        ...old,
        error: true,
        helper: "Province is invalid.",
      }));
      valid = false;
    }

    if (postalCode.value === "") {
      setPostalCode((old) => ({
        ...old,
        error: true,
        helper: "Postal code cannot be empty.",
      }));
      valid = false;
    } else if (postalCode.value.length < 6) {
      setPostalCode((old) => ({
        ...old,
        error: true,
        helper: "Postal code is invalid.",
      }));
      valid = false;
    }

    if (phoneNumber.value === "") {
      setPhoneNumber((old) => ({
        ...old,
        error: true,
        helper: "Phone number cannot be empty.",
      }));
      valid = false;
    } else if (phoneNumber.value.length < 10) {
      setPhoneNumber((old) => ({
        ...old,
        error: true,
        helper: "Phone number is invalid.",
      }));
      valid = false;
    }

    if (preferredTime.value === "") {
      setPreferredTime((old) => ({
        ...old,
        error: true,
        helper: "Preferred time cannot be empty.",
      }));
      valid = false;
    } else if (![0, 1, 2, 100].includes(preferredTime.value)) {
      setPreferredTime((old) => ({
        ...old,
        error: true,
        helper: "Preferred time is invalid.",
      }));
      valid = false;
    }

    return valid;
  };

  const encapsulate = () => {
    return {
      businessName: businessName.value,
      businessType: businessType.value,
      address1: address1.value,
      address2: address2.value,
      city: city.value,
      province: province.value,
      postalCode: postalCode.value,
      phoneNumber: phoneNumber.value,
      preferredTime: preferredTime.value,
      submissionMessage: submissionMessage.value,
    };
  };

  const handleSubmit = () => {
    if (inputsAreValid()) {
      setSubmitStatus((old) => ({
        value: "Please wait.",
        waiting: true,
      }));
      const formValues = encapsulate();

      fetch("/business/profile", {
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `${auth.type} ${auth.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values: formValues }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.code === 0) {
            dispatcher(setProfile(formValues));
            setSubmitStatus(() => ({
              value: "Profile was successfully saved.",
              waiting: false,
            }));
          } else {
            setSubmitStatus(() => ({
              value: "Something went wrong. Please try again later.",
              waiting: false,
            }));
          }
        })
        .catch(() => {
          setSubmitStatus(() => ({
            value: "Something went wrong. Please contact the administrator.",
            waiting: false,
          }));
        });
    } else {
      setSubmitStatus((old) => ({
        ...old,
        value: "Please fix the errors.",
      }));
    }
  };

  const classes = useClasses();
  return (
    <div className={classes.root}>
      <Grid container direction="row">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              borderColor: "black",
              borderBottom: "solid",
              borderWidth: 1,
            }}
          >
            <Grid item xs={10}>
              <Typography variant="body1">Business Information</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" spacing={1} style={{ padding: 8 }}>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                InputLabelProps={{
                  classes: {
                    asterisk: classes.asterisk,
                  },
                }}
                fullWidth
                label="Name"
                value={businessName.value}
                error={businessName.error}
                helperText={businessName.helper}
                onChange={handleBusinessNameChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth required error={businessType.error}>
                <InputLabel
                  classes={{
                    asterisk: classes.asterisk,
                  }}
                >
                  Type
                </InputLabel>
                <Select
                  value={businessType.value}
                  onChange={handleBusinessTypeChange}
                >
                  <MenuItem value={0}>Restaurant or Bar</MenuItem>
                  <MenuItem value={1}>Store</MenuItem>
                  <MenuItem value={100}>Other</MenuItem>
                </Select>
                <FormHelperText>{businessType.helper}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              borderColor: "black",
              borderBottom: "solid",
              borderWidth: 1,
            }}
          >
            <Grid item xs={10}>
              <Typography variant="body1">Contact Information</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" spacing={1} style={{ padding: 8 }}>
            <Grid item xs={12}>
              <TextField
                required
                InputLabelProps={{
                  classes: {
                    asterisk: classes.asterisk,
                  },
                }}
                fullWidth
                label="Address Line 1"
                value={address1.value}
                error={address1.error}
                helperText={address1.helper}
                onChange={handleAddress1Change}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address Line 2"
                value={address2.value}
                onChange={handleAddress2Change}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    required
                    InputLabelProps={{
                      classes: {
                        asterisk: classes.asterisk,
                      },
                    }}
                    fullWidth
                    label="City"
                    value={city.value}
                    error={city.error}
                    helperText={city.helper}
                    onChange={handleCityChange}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControl required fullWidth error={province.error}>
                    <InputLabel
                      classes={{
                        asterisk: classes.asterisk,
                      }}
                    >
                      Province
                    </InputLabel>
                    <Select
                      value={province.value}
                      onChange={handleProvinceChange}
                    >
                      <MenuItem value={0}>Alberta</MenuItem>
                      <MenuItem value={1}>British Columbia</MenuItem>
                      <MenuItem value={2}>Manitoba</MenuItem>
                      <MenuItem value={3}>New Brunswick</MenuItem>
                      <MenuItem value={4}>Newfoundland and Labrador</MenuItem>
                      <MenuItem value={5}>Northwest Territories</MenuItem>
                      <MenuItem value={6}>Nova Scotia</MenuItem>
                      <MenuItem value={7}>Nunavut</MenuItem>
                      <MenuItem value={8}>Ontario</MenuItem>
                      <MenuItem value={9}>Prince Edward Island</MenuItem>
                      <MenuItem value={10}>Quebec</MenuItem>
                      <MenuItem value={11}>Saskatchewan</MenuItem>
                      <MenuItem value={12}>Yukon</MenuItem>
                    </Select>
                    <FormHelperText>{province.helper}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    required
                    InputLabelProps={{
                      classes: {
                        asterisk: classes.asterisk,
                      },
                    }}
                    fullWidth
                    inputProps={{ maxLength: 6 }}
                    placeholder="A1A1A1"
                    label="Postal Code"
                    value={postalCode.value}
                    error={postalCode.error}
                    helperText={postalCode.helper}
                    onChange={handlePostalCodeChange}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    required
                    InputLabelProps={{
                      classes: {
                        asterisk: classes.asterisk,
                      },
                    }}
                    fullWidth
                    inputProps={{ maxLength: 14 }}
                    placeholder="(111) 111 1111"
                    label="Phone Number"
                    value={beautifyPhoneNumber(phoneNumber.value)}
                    error={phoneNumber.error}
                    helperText={phoneNumber.helper}
                    onChange={handlePhoneNumberChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl required fullWidth error={preferredTime.error}>
                    <InputLabel
                      classes={{
                        asterisk: classes.asterisk,
                      }}
                    >
                      Preferred Time
                    </InputLabel>
                    <Select
                      value={preferredTime.value}
                      onChange={handlePreferredTimeChange}
                    >
                      <MenuItem value={0}>Morning (09:00-11:59)</MenuItem>
                      <MenuItem value={1}>Afternoon (12:00-16:59)</MenuItem>
                      <MenuItem value={2}>Evening (17:00-20:59)</MenuItem>
                      <MenuItem value={100}>No Preference</MenuItem>
                    </Select>
                    <FormHelperText>{preferredTime.helper}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            alignItems="center"
            style={{
              paddingLeft: 8,
              paddingRight: 8,
              paddingTop: 8,
              borderColor: "black",
              borderBottom: "solid",
              borderWidth: 1,
            }}
          >
            <Grid item xs={10}>
              <Typography variant="body1">Customization</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container direction="row" spacing={1} style={{ padding: 8 }}>
            <Grid item xs={12}>
              <TextField
                multiline
                fullWidth
                label="Submission Message"
                value={submissionMessage.value}
                placeholder="Thank you for helping stop the spread of Covid-19. Enjoy your experience."
                helperText="The message patrons will see after they have added their
        information."
                onChange={handleSubmissionMessageChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ padding: 8 }}>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item className={classes.buttonWrapper}>
              <Button
                variant="contained"
                color="primary"
                disabled={submitStatus.waiting}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              {submitStatus.waiting && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </Grid>
            <Grid item>
              <Typography variant="body2">{submitStatus.value}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const useClasses = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    minHeight: 1000,
  },
  buttonWrapper: {
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  asterisk: {
    color: "red",
  },
}));
