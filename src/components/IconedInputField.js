import React, { useState, useEffect, useRef } from "react";

import Lottie from "lottie-web";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function IconedInputField(props) {
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
  } else if (type === "checkbox") {
    input = (
      <FormControl fullWidth>
        <FormControlLabel
          control={<Checkbox color="primary" checked={inputValue} {...other} />}
          label={label}
        />
      </FormControl>
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
}

const useClasses = makeStyles((theme) => ({
  asterisk: {
    color: "red",
  },
  iconButton: { padding: "0" },
}));
