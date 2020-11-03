import React, { useState } from "react";

import CropFreeIcon from "@material-ui/icons/CropFree";
import { makeStyles } from "@material-ui/core/styles";

export default function Customize(props) {
  const [movementControl, setMovementControl] = useState({
    xRotation: 0,
    yRotation: 0,
    transition: "none",
    firstLineZ: 0,
    qrCodeZ: 0,
    par1Z: 0,
    par2Z: 0,
    par3Z: 0,
  });

  const handleEnter = () => {
    setMovementControl((old) => ({
      ...old,
      transition: "none",
      firstLineZ: 50,
      qrCodeZ: 75,
      par1Z: 50,
      par2Z: 40,
      par3Z: 30,
    }));
  };

  const handleMove = (event) => {
    const offset = 7;

    const height = event.currentTarget.offsetHeight;
    const width = event.currentTarget.offsetWidth;

    const x =
      (event.clientX -
        event.currentTarget.offsetLeft -
        event.currentTarget.offsetParent.offsetLeft -
        width / 2) /
      offset;
    const y =
      (event.clientY -
        event.currentTarget.offsetTop -
        event.currentTarget.offsetParent.offsetTop -
        height / 2) /
      offset;

    setMovementControl((old) => ({ ...old, xRotation: -y, yRotation: x }));
  };

  const handleLeave = () => {
    setMovementControl(() => ({
      xRotation: 0,
      yRotation: 0,
      transition: "all 0.5s ease",
      firstLineZ: 0,
      qrCodeZ: 0,
      par1Z: 0,
      par2Z: 0,
      par3Z: 0,
    }));
  };

  const classes = useClasses();
  return (
    <div
      className={classes.root}
      onMouseEnter={props.disableMovement ? null : handleEnter}
      onMouseMove={props.disableMovement ? null : handleMove}
      onMouseLeave={props.disableMovement ? null : handleLeave}
      style={props.disableMovement ? { width: "auto", height: "auto" } : {}}
    >
      <div
        className={classes.container}
        style={{
          transition: `${movementControl.transition}`,
          transform: `rotateY(${movementControl.yRotation}deg) rotateX(${movementControl.xRotation}deg)`,
        }}
      >
        <p
          className={classes.firstLine}
          style={{
            color: props.titleColor,
            transform: `translateZ(${movementControl.firstLineZ}px)`,
            backgroundColor:
              props.activeComponent === "title"
                ? "rgba(255,0,0,0.25)"
                : "rgba(0,0,0,0)",
          }}
        >
          *********
        </p>
        <div
          className={classes.qrCode}
          style={{
            transform: `translateZ(${movementControl.qrCodeZ}px)`,
          }}
        >
          <CropFreeIcon
            color={props.activeComponent === "qr" ? "error" : "primary"}
            style={{
              fontSize: props.activeComponent === "qr" ? 80 : 40,
              transition: `all 0.75s ease-out`,
            }}
          />
        </div>
        <div
          style={{
            transition: `all 0.75s ease-out`,
            backgroundColor:
              props.activeComponent === "par"
                ? "rgba(255,0,0,0.25)"
                : "rgba(0,0,0,0)",
          }}
        >
          {props.parCount > 0 && (
            <p
              className={classes.par}
              style={{
                transform: `translateZ(${movementControl.par1Z}px)`,
                backgroundColor:
                  props.activeComponent === "par1"
                    ? "rgba(255,0,0,0.25)"
                    : "rgba(0,0,0,0)",
                marginBlockEnd: props.par1SpaceAfter ? "1em" : "0",
                textAlign: props.par1Algin,
                color: props.par1Color,
              }}
            >
              ********* ********* **** *********
            </p>
          )}

          {props.parCount > 1 && (
            <p
              className={classes.par}
              style={{
                transform: `translateZ(${movementControl.par2Z}px)`,
                backgroundColor:
                  props.activeComponent === "par2"
                    ? "rgba(255,0,0,0.25)"
                    : "rgba(0,0,0,0)",
                marginBlockEnd: props.par2SpaceAfter ? "1em" : "0",
                textAlign: props.par2Algin,
                color: props.par2Color,
              }}
            >
              *********
            </p>
          )}

          {props.parCount > 2 && (
            <p
              className={classes.par}
              style={{
                transform: `translateZ(${movementControl.par3Z}px)`,
                backgroundColor:
                  props.activeComponent === "par3"
                    ? "rgba(255,0,0,0.25)"
                    : "rgba(0,0,0,0)",
                textAlign: props.par3Algin,
                color: props.par3Color,
              }}
            >
              *** ***** *** *** ********* **** *** ******
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const paperSize = { width: 212.5, height: 275 };

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
    width: paperSize.width * 1.5,
    height: paperSize.height * 1.5,
    perspective: 500,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: paperSize.width,
    height: paperSize.height,
    padding: theme.spacing(1),
    boxShadow: "5px 20px 20px rgba(0,0,0,0.2), 0px 0px 20px rgba(0,0,0,0.5)",
    borderRadius: 15,
    transformStyle: "preserve-3d",
  },
  firstLine: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
    width: paperSize.width * 0.75,
    transition: `all 0.75s ease-out`,
    marginBottom: "1em",
  },
  qrCode: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    backgroundColor: "rgba(0,0,0,0.85)",
    transition: `all 0.75s ease-out`,
    fontSize: 12,
    marginBottom: "1em",
  },
  par: {
    color: "black",
    fontSize: 12,
    textAlign: "justified",
    width: paperSize.width * 0.75,
    transition: `all 0.75s ease-out`,
    marginBlockStart: 0,
  },
}));
