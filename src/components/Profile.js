import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Lottie from "lottie-web";

import { setProfile } from "../actions/business";

import {
  Grid,
  IconButton,
  MenuItem,
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

  /**
   * Contains the entire state of the form, including the values, formatting information,
   * submission information, and each field's restrictions; i.e. length or list or not
   * being required.
   */
  const [status, setStatus] = useState({
    businessName: {
      value: "",
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Business name",

      minLength: 3,
    },
    businessType: {
      value: "",
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Business type",

      allowedFrom: ["Restaurant or Bar", "Store", "Other"],
    },
    addressLine1: {
      value: "",
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Address line 1",
    },
    addressLine2: {
      value: "",
      lastSubmittedValue: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Address line 2",

      notRequired: true,
    },
    city: {
      value: "",
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "City",
    },
    province: {
      value: "",
      lastSubmittedValue: "",
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
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Postal code",

      minLength: 6,
    },
    phoneNumber: {
      value: "",
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Phone number",

      minLength: 10,
    },
    preferredTime: {
      value: "",
      lastSubmittedValue: "",
      formattingError: false,
      formattingMessage: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Preferred time",

      allowedFrom: ["Morning", "Afternoon", "Evening", "No Preferrence"],
    },
    submissionMessage: {
      value: "",
      lastSubmittedValue: "",
      submissionStatus: "",
      submissionMessage: "",

      properTitle: "Submission message",

      notRequired: true,
    },
  });

  /**
   * Uses the business.profile object from redux to fill in the fields.
   *
   * @see business.profile
   */
  useEffect(() => {
    if (business.profile) {
      setStatus((old) => ({
        ...old,
        businessName: {
          ...old.businessName,
          value:
            business.profile.businessName !== undefined
              ? business.profile.businessName
              : "",
          lastSubmittedValue:
            business.profile.businessName !== undefined
              ? business.profile.businessName
              : "",
        },
        businessType: {
          ...old.businessType,
          value:
            business.profile.businessType !== undefined
              ? business.profile.businessType
              : "",
          lastSubmittedValue:
            business.profile.businessType !== undefined
              ? business.profile.businessType
              : "",
        },
        addressLine1: {
          ...old.addressLine1,
          value:
            business.profile.addressLine1 !== undefined
              ? business.profile.addressLine1
              : "",
          lastSubmittedValue:
            business.profile.addressLine1 !== undefined
              ? business.profile.addressLine1
              : "",
        },
        addressLine2: {
          ...old.addressLine2,
          value:
            business.profile.addressLine2 !== undefined
              ? business.profile.addressLine2
              : "",
          lastSubmittedValue:
            business.profile.addressLine2 !== undefined
              ? business.profile.addressLine2
              : "",
        },
        city: {
          ...old.city,
          value:
            business.profile.city !== undefined ? business.profile.city : "",
          lastSubmittedValue:
            business.profile.city !== undefined ? business.profile.city : "",
        },
        province: {
          ...old.province,
          value:
            business.profile.province !== undefined
              ? business.profile.province
              : "",
          lastSubmittedValue:
            business.profile.province !== undefined
              ? business.profile.province
              : "",
        },
        postalCode: {
          ...old.postalCode,
          value:
            business.profile.postalCode !== undefined
              ? business.profile.postalCode
              : "",
          lastSubmittedValue:
            business.profile.postalCode !== undefined
              ? business.profile.postalCode
              : "",
        },
        phoneNumber: {
          ...old.phoneNumber,
          value:
            business.profile.phoneNumber !== undefined
              ? business.profile.phoneNumber
              : "",
          lastSubmittedValue:
            business.profile.phoneNumber !== undefined
              ? business.profile.phoneNumber
              : "",
        },
        preferredTime: {
          ...old.preferredTime,
          value:
            business.profile.preferredTime !== undefined
              ? business.profile.preferredTime
              : "",
          lastSubmittedValue:
            business.profile.preferredTime !== undefined
              ? business.profile.preferredTime
              : "",
        },
        submissionMessage: {
          ...old.submissionMessage,
          value:
            business.profile.submissionMessage !== undefined
              ? business.profile.submissionMessage
              : "",
          lastSubmittedValue:
            business.profile.submissionMessage !== undefined
              ? business.profile.submissionMessage
              : "",
        },
      }));
    }
  }, [business.profile]);

  /**
   * Handles the changes to status.
   *
   * @param {object}  event         The relevant event that caused this function to be called.
   * @param {string}  field         The field that should be changed. Note that the name of
   *                                this field must match the keys in the status.
   * @param {boolean} noFormatting  If set to true, formatting information will not be stored
   *                                for this field.
   */
  const handleChange = (event, field, noFormatting = false) => {
    event.persist();
    setStatus((old) => {
      const newStatus = { ...old };
      newStatus[field] = {
        ...old[field],
        value: event.target.value,
        submissionStatus:
          old[field].submissionStatus === "done"
            ? ""
            : old[field].submissionStatus,
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

  /**
   * Handles the submission of the field values to the back-end.
   * If there are foratting errors, the appropriate fields will
   * be updated in status and no information will be sent to the
   * back-end.
   * Otherwise, the information will be sent to the back-end and
   * based on the success of this operation the status will be
   * updated and the business.profile reducer is updated.
   *
   * @param {string} field The field that must be submitted to the back-end.
   */
  const handleSubmit = (field) => {
    if (status[field].value === status[field].lastSubmittedValue) return;

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
    } else {
      const values = {};
      values[field] = status[field].value;
      fetch("/business/profile", {
        method: "POST",
        cache: "no-cache",
        headers: {
          Authorization: `${auth.type} ${auth.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 0) {
            setStatus((old) => {
              const newStatus = { ...old };
              newStatus[field] = {
                ...old[field],
                submissionStatus: "done",
                submissionMessage: "Stored successfully.",
                lastSubmittedValue: old[field].value,
              };
              return newStatus;
            });
            dispatcher(setProfile(field, status[field].value));
          } else {
            setStatus((old) => {
              const newStatus = { ...old };
              newStatus[field] = {
                ...old[field],
                submissionStatus: "error",
                submissionMessage: "Something went wrong. Try again later.",
              };
              return newStatus;
            });
          }
        })
        .catch((error) => {
          setStatus((old) => {
            const newStatus = { ...old };
            newStatus[field] = {
              ...old[field],
              submissionStatus: "error",
              submissionMessage:
                "Something went wrong. Contact the administrator.",
            };
            return newStatus;
          });
        });
    }
  };

  /**
   * Given a field, determines whether the value of that field is valid
   * or not.
   *
   * @see     {status.$.notRequired}
   * @see     {status.$.allowedFrom}
   * @see     {status.$.minLength}
   *
   * @param   {string} field
   * @returns {object}
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
            icon={
              status.businessName.formattingError
                ? "warning"
                : status.businessName.submissionStatus
            }
            iconId={status.businessName.properTitle}
            iconMessage={
              status.businessName.formattingError
                ? status.businessName.formattingMessage
                : status.businessName.submissionMessage
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
            icon={
              status.businessType.formattingError
                ? "warning"
                : status.businessType.submissionStatus
            }
            iconId={status.businessType.properTitle}
            iconMessage={
              status.businessType.formattingError
                ? status.businessType.formattingMessage
                : status.businessType.submissionMessage
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
            icon={
              status.addressLine1.formattingError
                ? "warning"
                : status.addressLine1.submissionStatus
            }
            iconId={status.addressLine1.properTitle}
            iconMessage={
              status.addressLine1.formattingError
                ? status.addressLine1.formattingMessage
                : status.addressLine1.submissionMessage
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
            inputError={status.addressLine2.submissionStatus === "error"}
            icon={status.addressLine2.submissionStatus}
            iconId={status.addressLine2.properTitle}
            iconMessage={status.addressLine2.submissionMessage}
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
            icon={
              status.city.formattingError
                ? "warning"
                : status.city.submissionStatus
            }
            iconId={status.city.properTitle}
            iconMessage={
              status.city.formattingError
                ? status.city.formattingMessage
                : status.city.submissionMessage
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
            icon={
              status.province.formattingError
                ? "warning"
                : status.province.submissionStatus
            }
            iconId={status.province.properTitle}
            iconMessage={
              status.province.formattingError
                ? status.province.formattingMessage
                : status.province.submissionMessage
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
            icon={
              status.postalCode.formattingError
                ? "warning"
                : status.postalCode.submissionStatus
            }
            iconId={status.postalCode.properTitle}
            iconMessage={
              status.postalCode.formattingError
                ? status.postalCode.formattingMessage
                : status.postalCode.submissionMessage
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
            icon={
              status.phoneNumber.formattingError
                ? "warning"
                : status.phoneNumber.submissionStatus
            }
            iconId={status.phoneNumber.properTitle}
            iconMessage={
              status.phoneNumber.formattingError
                ? status.phoneNumber.formattingMessage
                : status.phoneNumber.submissionMessage
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
            icon={
              status.preferredTime.formattingError
                ? "warning"
                : status.preferredTime.submissionStatus
            }
            iconId={status.preferredTime.properTitle}
            iconMessage={
              status.preferredTime.formattingError
                ? status.preferredTime.formattingMessage
                : status.preferredTime.submissionMessage
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
            inputError={status.submissionMessage.submissionStatus === "error"}
            icon={status.submissionMessage.submissionStatus}
            iconId={status.submissionMessage.properTitle}
            iconMessage={status.submissionMessage.submissionMessage}
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
