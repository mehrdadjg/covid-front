import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Lottie from "lottie-web";

import { setProfile } from "../actions/business";

import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";

export default function Profile() {
  const dispatcher = useDispatch();
  const auth = useSelector((state) => state.auth);
  const business = useSelector((state) => state.business);

  const [status, setStatus] = useState({
    businessName: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Business name",

      minLength: 3,
    },
    businessType: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Business type",

      allowedFrom: ["Restaurant or Bar", "Store", "Other"],
    },
    addressLine1: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Address line 1",
    },
    addressLine2: {
      value: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Address line 2",

      notRequired: true,
    },
    city: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "City",
    },
    province: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Province",

      allowedFrom: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon",
      ],
    },
    postalCode: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Postal code",

      minLength: 6,
    },
    phoneNumber: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Phone number",

      minLength: 10,
    },
    preferredTime: {
      value: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Preferred time",

      allowedFrom: ["Morning", "Afternoon", "Evening", "No Preferrence"],
    },
    submissionMessage: {
      value: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Submission message",

      notRequired: true,
    },
  });

  useEffect(() => {
    if (business.profile) {
      setStatus((old) => ({
        ...old,
        businessName: {
          ...old.businessName,
          value: business.profile.businessName || "",
        },
        businessType: {
          ...old.businessType,
          value: business.profile.businessType || "",
        },
        addressLine1: {
          ...old.addressLine1,
          value: business.profile.address1 || "",
        },
        addressLine2: {
          ...old.addressLine2,
          value: business.profile.address2 || "",
        },
        city: {
          ...old.city,
          value: business.profile.city || "",
        },
        province: {
          ...old.province,
          value: business.profile.province || "",
        },
        postalCode: {
          ...old.postalCode,
          value: business.profile.postalCode || "",
        },
        phoneNumber: {
          ...old.phoneNumber,
          value: business.profile.phoneNumber || "",
        },
        preferredTime: {
          ...old.preferredTime,
          value: business.profile.preferredTime || "",
        },
        submissionMessage: {
          ...old.submissionMessage,
          value: business.profile.submissionMessage || "",
        },
      }));
    }
  }, [business.profile]);

  const handleChange = (event, field, noFormatting = false) => {
    event.persist();
    setStatus((old) => {
      const newStatus = { ...old };
      newStatus[field] = {
        ...old[field],
        value: event.target.value,
      };
      if (!noFormatting) {
        newStatus[field] = {
          ...newStatus[field],
          formattingError: false,
          formattingMessage: "",
        };
      }
      return newStatus;
    });
  };

  const handleSubmit = (field) => {
    const { error, message } = isValidInput(field);

    if (error) {
      setStatus((old) => {
        const newStatus = { ...old };
        newStatus[field] = {
          ...old[field],
          formattingError: true,
          formattingMessage: message,
        };
        return newStatus;
      });
      return;
    }
  };

  /*
  const inputsAreValid = () => {
    let valid = true;

    if (businessType.value === "") {
      setBusinessType((old) => ({
        ...old,
        error: true,
        helper: "Business type cannot be empty.",
      }));
      valid = false;
    } else if (
      businessType.value >= 0 &&
      businessType.value < businessTypes.length
    ) {
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
      province.value > 0 &&
      province.value < canadianProvinces.length
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
    } else if (
      preferredTime.value >= 0 &&
      preferredTime.value < preferredTimes.length
    ) {
      setPreferredTime((old) => ({
        ...old,
        error: true,
        helper: "Preferred time is invalid.",
      }));
      valid = false;
    }

    return valid;
  };
  */

  const isValidInput = (field) => {
    if (status[field].notRequired) {
      return {
        error: false,
        message: null,
      };
    } else if (
      typeof status[field].value === "string" &&
      status[field].value.length === 0
    ) {
      return {
        error: true,
        message: `${status[field].properTitle} cannot be empty.`,
      };
    } else if (status[field].allowedFrom) {
      if (
        status[field].value < 0 ||
        status[field].value >= status[field].allowedFrom
      ) {
        return {
          error: true,
          message: `${status[field].properTitle} is invalid.`,
        };
      }
    } else if (status[field].minLength) {
      if (status[field].value.length < status[field].minLength) {
        return {
          error: true,
          message: `${status[field].properTitle} is too short.`,
        };
      }
    }

    return {
      error: false,
      message: null,
    };
  };

  /*
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
  */

  const classes = useClasses();
  return (
    <div className={classes.root}>
      <Typography variant="body1">
        You can change the following setting. We will store them as you are
        editing.
      </Typography>
      <Grid
        className={classes.formContainer}
        container
        direction="row"
        spacing={2}
      >
        <Grid item xs={12} sm={6} md={8}>
          <IconedInputField
            type="text"
            required
            label="Business Name"
            inputValue={status.businessName.value}
            onChange={(event) => {
              handleChange(event, "businessName");
            }}
            onBlur={() => {
              handleSubmit("businessName");
            }}
            inputError={
              status.businessName.formattingError ||
              status.businessName.submissionStatus === "error"
            }
            icon={status.businessName.formattingError ? "warning" : ""}
            iconId={status.businessName.properTitle}
            iconMessage={
              status.businessName.formattingError
                ? status.businessName.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <IconedInputField
            type="select"
            required
            items={status.businessType.allowedFrom}
            label="Business Type"
            inputValue={status.businessType.value}
            onChange={(event) => {
              handleChange(event, "businessType");
            }}
            onBlur={() => {
              handleSubmit("businessType");
            }}
            inputError={
              status.businessType.formattingError ||
              status.businessType.submissionStatus === "error"
            }
            icon={status.businessType.formattingError ? "warning" : ""}
            iconId={status.businessType.properTitle}
            iconMessage={
              status.businessType.formattingError
                ? status.businessType.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconedInputField
            type="text"
            required
            label="Address Line 1"
            inputValue={status.addressLine1.value}
            onChange={(event) => {
              handleChange(event, "addressLine1");
            }}
            onBlur={() => {
              handleSubmit("addressLine1");
            }}
            inputError={
              status.addressLine1.formattingError ||
              status.addressLine1.submissionStatus === "error"
            }
            icon={status.addressLine1.formattingError ? "warning" : ""}
            iconId={status.addressLine1.properTitle}
            iconMessage={
              status.addressLine1.formattingError
                ? status.addressLine1.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconedInputField
            type="text"
            label="Address Line 2"
            inputValue={status.addressLine2.value}
            onChange={(event) => {
              handleChange(event, "addressLine2", true);
            }}
            onBlur={() => {
              handleSubmit("addressLine2");
            }}
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <IconedInputField
            type="text"
            required
            label="City"
            inputValue={status.city.value}
            onChange={(event) => {
              handleChange(event, "city");
            }}
            onBlur={() => {
              handleSubmit("city");
            }}
            inputError={
              status.city.formattingError ||
              status.city.submissionStatus === "error"
            }
            icon={status.city.formattingError ? "warning" : ""}
            iconId={status.city.properTitle}
            iconMessage={
              status.city.formattingError ? status.city.formattingMessage : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <IconedInputField
            type="select"
            required
            items={status.province.allowedFrom}
            label="Province"
            inputValue={status.province.value}
            onChange={(event) => {
              handleChange(event, "province");
            }}
            onBlur={() => {
              handleSubmit("province");
            }}
            inputError={
              status.province.formattingError ||
              status.province.submissionStatus === "error"
            }
            icon={status.province.formattingError ? "warning" : ""}
            iconId={status.province.properTitle}
            iconMessage={
              status.province.formattingError
                ? status.province.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <IconedInputField
            type="text"
            required
            label="Postal Code"
            inputValue={status.postalCode.value}
            placeholder="A1A1A1"
            inputProps={{ maxLength: 6 }}
            onChange={(event) => {
              handleChange(event, "postalCode");
            }}
            onBlur={() => {
              handleSubmit("postalCode");
            }}
            inputError={
              status.postalCode.formattingError ||
              status.postalCode.submissionStatus === "error"
            }
            icon={status.postalCode.formattingError ? "warning" : ""}
            iconId={status.postalCode.properTitle}
            iconMessage={
              status.postalCode.formattingError
                ? status.postalCode.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <IconedInputField
            type="text"
            required
            label="Phone Number"
            inputValue={status.phoneNumber.value}
            placeholder="1111111111"
            inputProps={{ maxLength: 10 }}
            onChange={(event) => {
              handleChange(event, "phoneNumber");
            }}
            onBlur={() => {
              handleSubmit("phoneNumber");
            }}
            inputError={
              status.phoneNumber.formattingError ||
              status.phoneNumber.submissionStatus === "error"
            }
            icon={status.phoneNumber.formattingError ? "warning" : ""}
            iconId={status.phoneNumber.properTitle}
            iconMessage={
              status.phoneNumber.formattingError
                ? status.phoneNumber.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <IconedInputField
            type="select"
            required
            items={status.preferredTime.allowedFrom}
            label="Preferreed Time"
            inputValue={status.preferredTime.value}
            onChange={(event) => {
              handleChange(event, "preferredTime");
            }}
            onBlur={() => {
              handleSubmit("preferredTime");
            }}
            inputError={
              status.preferredTime.formattingError ||
              status.preferredTime.submissionStatus === "error"
            }
            icon={status.preferredTime.formattingError ? "warning" : ""}
            iconId={status.preferredTime.properTitle}
            iconMessage={
              status.preferredTime.formattingError
                ? status.preferredTime.formattingMessage
                : ""
            }
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
        <Grid item xs={12}>
          <IconedInputField
            type="text"
            multiline
            rows={3}
            label="Submission Message"
            inputValue={status.submissionMessage.value}
            onChange={(event) => {
              handleChange(event, "submissionMessage", true);
            }}
            onBlur={() => {
              handleSubmit("submissionMessage");
            }}
            iconIsButton={false}
            onIconClick={() => {}}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const IconedInputField = (props) => {
  const {
    type,
    label,
    items,
    inputValue,
    inputError,
    icon,
    iconId,
    iconIsButton,
    onIconClick,
    iconMessage,
    ...other
  } = props;
  const classes = useClasses();

  let input = null;
  if (type === "text") {
    input = (
      <TextField
        label={label}
        variant="outlined"
        InputLabelProps={{
          classes: {
            asterisk: classes.asterisk,
          },
        }}
        fullWidth
        value={inputValue}
        error={inputError}
        {...other}
      />
    );
  } else if (type === "select") {
    input = (
      <TextField
        label={label}
        variant="outlined"
        select
        SelectProps={{
          MenuProps: {
            disableScrollLock: true,
          },
        }}
        InputLabelProps={{
          classes: {
            asterisk: classes.asterisk,
          },
        }}
        fullWidth
        value={inputValue}
        error={inputError}
        {...other}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={index}>
            {item}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  const [iconProperties, setIconProperties] = useState({
    size: 0,
    opacity: 0,
  });

  const iconContainer = useRef(null);
  useEffect(() => {
    if (icon === "error" || icon === "warning") {
      setIconProperties((old) => ({
        ...old,
        opacity: 1,
        size: 40,
      }));
      const animation =
        icon === "error"
          ? require("../animations/error.json")
          : require("../animations/warning.json");
      Lottie.loadAnimation({
        name: iconId,
        container: iconContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animation,
      });
    } else if (icon === "done") {
      setIconProperties((old) => ({
        ...old,
        opacity: 1,
        size: 40,
      }));
      const errorAnimation = require("../animations/done.json");
      Lottie.loadAnimation({
        name: iconId,
        container: iconContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: errorAnimation,
      }).addEventListener("complete", () => {
        setIconProperties((old) => ({
          ...old,
          opacity: 0,
          size: 0,
        }));
        setTimeout(() => {
          Lottie.destroy(iconId);
        }, 250);
      });
    } else {
      setIconProperties((old) => ({
        ...old,
        opacity: 0,
        size: 0,
      }));
      setTimeout(() => {
        Lottie.destroy(iconId);
      }, 250);
    }
  }, [icon, iconId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {input}
      <Tooltip title={iconMessage} placement="left">
        {iconIsButton ? (
          <IconButton
            color="primary"
            classes={{ root: classes.iconButton }}
            onClick={onIconClick}
          >
            <div
              style={{
                width: `${iconProperties.size}px`,
                height: `${iconProperties.size}px`,
                opacity: iconProperties.opacity,
                overflow: "hidden",
                transition: "all 0.25s ease-out",
              }}
              ref={iconContainer}
            />
          </IconButton>
        ) : (
          <div
            style={{
              width: `${iconProperties.size}px`,
              height: `${iconProperties.size}px`,
              opacity: iconProperties.opacity,
              overflow: "hidden",
              transition: "all 0.25s ease-out",
            }}
            ref={iconContainer}
          />
        )}
      </Tooltip>
    </div>
  );
};

const useClasses = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    minHeight: 1000,
  },
  formContainer: {
    marginTop: theme.spacing(3),
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
  iconButton: { padding: "0" },
}));
