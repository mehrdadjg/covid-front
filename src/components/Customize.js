import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import lottie from "lottie-web";

import PDFPage from "./PDFPage";
import IconedInputField from "./IconedInputField";

import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Customize() {
  const auth = useSelector((state) => state.auth);

  const [activeComponent, setActiveComponent] = useState("");
  const iconContainer = useRef(null);

  const doneAnimation = require("../animations/done.json");
  const errorAnimation = require("../animations/error.json");
  const [animationSetting, setAnimationSetting] = useState({
    opacity: 1,
  });

  const playDone = () => {
    setAnimationSetting((old) => ({ ...old, opacity: 1 }));

    lottie
      .loadAnimation({
        container: iconContainer.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: doneAnimation,
      })
      .addEventListener("complete", () => {
        setAnimationSetting((old) => ({ ...old, opacity: 0 }));
        setTimeout(() => {
          lottie.destroy();
        }, 250);
      });
  };

  const playError = () => {
    setAnimationSetting((old) => ({ ...old, opacity: 1 }));

    lottie.loadAnimation({
      container: iconContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: errorAnimation,
    });
  };

  const resetActiveComponent = () => {
    setActiveComponent(() => "");
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 800 });

  const sizes = ["Small", "Medium", "Large", "Extra Large"];
  const colors = ["Black", "Red", "Green", "Blue", "Yellow", "Orange"];
  const paragraphCounts = ["None", "One", "Two", "Three"];
  const alignments = ["Left", "Center", "Right", "Justify"];

  const [status, setStatus] = useState({
    topLine: {
      text: {
        value: "",
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Top Line Text",
      },
      fontSize: {
        value: 1,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Top Line Font Size",

        allowedFrom: sizes,
      },
      fontColor: {
        value: 0,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Top Line Font Color",

        allowedFrom: colors,
      },
    },

    qrImageSize: {
      value: 2,
      lastSubmittedValue: "",
      submissionStatus: "",
      submissionMessage: "",

      tag: "QR Image Size",

      allowedFrom: sizes,
    },

    paragraphCount: {
      value: 3,
      lastSubmittedValue: "",
      submissionStatus: "",
      submissionMessage: "",

      tag: "Paragraph Count",

      allowedFrom: paragraphCounts,
    },

    paragraph1: {
      text: {
        value: "",
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 1 Text",
      },
      fontSize: {
        value: 1,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 1 Font Size",

        allowedFrom: sizes,
      },
      alignment: {
        value: 3,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 1 Alignment",

        allowedFrom: alignments,
      },
      fontColor: {
        value: 0,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 1 Font Color",

        allowedFrom: colors,
      },
      spaceAfter: {
        value: true,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 1 Space After",
      },
    },

    paragraph2: {
      text: {
        value: "",
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 2 Text",
      },
      fontSize: {
        value: 1,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 2 Font Size",

        allowedFrom: sizes,
      },
      alignment: {
        value: 1,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 2 Alignment",

        allowedFrom: alignments,
      },
      fontColor: {
        value: 0,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 2 Font Color",

        allowedFrom: colors,
      },
      spaceAfter: {
        value: false,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 2 Space After",
      },
    },

    paragraph3: {
      text: {
        value: "",
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 3 Text",
      },
      fontSize: {
        value: 4,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 3 Font Size",

        allowedFrom: sizes,
      },
      alignment: {
        value: 1,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 3 Alignment",

        allowedFrom: alignments,
      },
      fontColor: {
        value: 4,
        lastSubmittedValue: "",
        submissionStatus: "",
        submissionMessage: "",

        tag: "Paragraph 3 Font Color",

        allowedFrom: colors,
      },
    },
  });

  /**
   * Handles the changes to status.
   *
   * @param {Object}  event
   * @param {Array}   field     This argument is an array of strings.
   * @param {Boolean} fromValue If set to false, the new value is taken from
   *                            the checked field of event.
   */
  const handleChange = (event, field, fromValue = true) => {
    event.persist();
    setStatus((old) => {
      const newStatus = { ...old };

      let target = newStatus[field[0]];
      for (let i = 1; i < field.length; i++) {
        target = target[field[i]];
      }

      target.value = fromValue ? event.target.value : event.target.checked;

      return newStatus;
    });
  };

  /**
   * Handles the submission of new values to the back-end.
   *
   * @param {Array} field This argument is an array of strings.
   */
  const handleSumbit = (field) => {};

  const [topLineProperties, setTopLineProperties] = useState({
    previousText: "",
    text: "",
    previousFontSize: 1,
    fontSize: 1,
    previousColor: 0,
    color: 0,
  });

  const [qrCodeProperties, setQrCodeProperties] = useState({
    previousSize: 1,
    size: 1,
  });

  const [paragraphCountProperties, setParagraphCountProperties] = useState({
    previousCount: 2,
    count: 2,
  });

  const [paragraphProperties, setParagraphProperties] = useState([
    {
      previousText: "",
      text: "",
      previousFontSize: 1,
      fontSize: 1,
      previousAlignment: 0,
      alignment: 0,
      previousColor: 0,
      color: 0,
      previousSpaceAfter: true,
      spaceAfter: true,
    },
    {
      previousText: "",
      text: "",
      previousFontSize: 1,
      fontSize: 1,
      previousAlignment: 0,
      alignment: 0,
      previousColor: 0,
      color: 0,
      previousSpaceAfter: true,
      spaceAfter: true,
    },
    {
      previousText: "",
      text: "",
      previousFontSize: 1,
      fontSize: 1,
      previousAlignment: 0,
      alignment: 0,
      previousColor: 0,
      color: 0,
      previousSpaceAfter: true,
      spaceAfter: true,
    },
  ]);

  useEffect(() => {
    fetch("/business/downloadpdf/settings", {
      headers: {
        Authorization: `${auth.type} ${auth.value}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          const settings = data.settings.pdf;

          setStatus((old) => ({
            ...old,
            topLine: {
              ...old.topLine,
              text: {
                ...old.topLine.text,
                value: settings.topLine.text,
                lastSubmittedValue: settings.topLine.text,
              },
              fontSize: {
                ...old.topLine.fontSize,
                value: settings.topLine.fontSize,
                lastSubmittedValue: settings.topLine.fontSize,
              },
              fontColor: {
                ...old.topLine.fontColor,
                value: settings.topLine.fontColor,
                lastSubmittedValue: settings.topLine.fontColor,
              },
            },
            qrImageSize: {
              ...old.qrImageSize,
              value: settings.qrImageSize,
              lastSubmittedValue: settings.qrImageSize,
            },
            paragraphCount: {
              ...old.paragraphCount,
              value: settings.paragraphCount,
              lastSubmittedValue: settings.paragraphCount,
            },
            paragraph1: {
              ...old.paragraph1,
              text: {
                ...old.paragraph1.text,
                value: settings.paragraph1.text,
                lastSubmittedValue: settings.paragraph1.text,
              },
              fontSize: {
                ...old.paragraph1.fontSize,
                value: settings.paragraph1.fontSize,
                lastSubmittedValue: settings.paragraph1.fontSize,
              },
              alignment: {
                ...old.paragraph1.alignment,
                value: settings.paragraph1.alignment,
                lastSubmittedValue: settings.paragraph1.alignment,
              },
              fontColor: {
                ...old.paragraph1.fontColor,
                value: settings.paragraph1.fontColor,
                lastSubmittedValue: settings.paragraph1.fontColor,
              },
              spaceAfter: {
                ...old.paragraph1.spaceAfter,
                value: settings.paragraph1.spaceAfter,
                lastSubmittedValue: settings.paragraph1.spaceAfter,
              },
            },
            paragraph2: {
              ...old.paragraph2,
              text: {
                ...old.paragraph2.text,
                value: settings.paragraph2.text,
                lastSubmittedValue: settings.paragraph2.text,
              },
              fontSize: {
                ...old.paragraph2.fontSize,
                value: settings.paragraph2.fontSize,
                lastSubmittedValue: settings.paragraph2.fontSize,
              },
              alignment: {
                ...old.paragraph2.alignment,
                value: settings.paragraph2.alignment,
                lastSubmittedValue: settings.paragraph2.alignment,
              },
              fontColor: {
                ...old.paragraph2.fontColor,
                value: settings.paragraph2.fontColor,
                lastSubmittedValue: settings.paragraph2.fontColor,
              },
              spaceAfter: {
                ...old.paragraph2.spaceAfter,
                value: settings.paragraph2.spaceAfter,
                lastSubmittedValue: settings.paragraph2.spaceAfter,
              },
            },
            paragraph3: {
              ...old.paragraph3,
              text: {
                ...old.paragraph3.text,
                value: settings.paragraph3.text,
                lastSubmittedValue: settings.paragraph3.text,
              },
              fontSize: {
                ...old.paragraph3.fontSize,
                value: settings.paragraph3.fontSize,
                lastSubmittedValue: settings.paragraph3.fontSize,
              },
              alignment: {
                ...old.paragraph3.alignment,
                value: settings.paragraph3.alignment,
                lastSubmittedValue: settings.paragraph3.alignment,
              },
              fontColor: {
                ...old.paragraph3.fontColor,
                value: settings.paragraph3.fontColor,
                lastSubmittedValue: settings.paragraph3.fontColor,
              },
            },
          }));
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth]);

  const pdfPage = (
    <PDFPage
      activeComponent={activeComponent}
      titleColor={colors[status.topLine.fontColor.value].toLowerCase()}
      parCount={status.paragraphCount.value}
      par1Algin={alignments[status.paragraph1.alignment.value].toLowerCase()}
      par1Color={colors[status.paragraph1.fontColor.value].toLowerCase()}
      par1SpaceAfter={status.paragraph1.spaceAfter.value}
      par2Algin={alignments[status.paragraph2.alignment.value].toLowerCase()}
      par2Color={colors[status.paragraph2.fontColor.value].toLowerCase()}
      par2SpaceAfter={status.paragraph2.spaceAfter.value}
      par3Algin={alignments[status.paragraph3.alignment.value].toLowerCase()}
      par3Color={colors[status.paragraph3.fontColor.value].toLowerCase()}
      disableMovement={isSmallScreen}
    />
  );

  const classes = useClasses();
  return (
    <div className={classes.root}>
      <div className={classes.controlContainer}>
        <Typography
          variant="body1"
          style={
            isSmallScreen
              ? { width: "auto" }
              : {
                  width: "calc(100% - 318.75px)",
                }
          }
        >
          You can change the following setting. We will store them as you are
          editing.
        </Typography>
        <Grid
          container
          className={classes.formContainer}
          style={
            isSmallScreen
              ? { width: "auto" }
              : {
                  width: "calc(100% - 318.75px)",
                }
          }
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={12}>
            <IconedInputField
              type="text"
              label="Top Line Text"
              inputValue={status.topLine.text.value}
              onFocus={() => {
                setActiveComponent("title");
              }}
              onChange={(event) => {
                handleChange(event, ["topLine", "text"]);
              }}
              onBlur={() => {
                resetActiveComponent();
                handleSumbit(["topLine", "text"]);
              }}
              inputError={status.topLine.text.submissionStatus === "error"}
              icon={status.topLine.text.submissionStatus}
              iconId={status.topLine.text.tag}
              iconMessage={status.topLine.text.submissionMessage}
              iconIsButton={false}
              onIconClick={() => {}}
            />
          </Grid>

          <Grid item xs={6}>
            <IconedInputField
              type="select"
              items={status.topLine.fontSize.allowedFrom}
              label="Font Size"
              inputValue={status.topLine.fontSize.value}
              onFocus={() => {
                setActiveComponent("title");
              }}
              onChange={(event) => {
                handleChange(event, ["topLine", "fontSize"]);
              }}
              onBlur={() => {
                resetActiveComponent();
                handleSumbit(["topLine", "fontSize"]);
              }}
              inputError={status.topLine.fontSize.submissionStatus === "error"}
              icon={status.topLine.fontSize.submissionStatus}
              iconId={status.topLine.fontSize.tag}
              iconMessage={status.topLine.fontSize.submissionMessage}
              iconIsButton={false}
              onIconClick={() => {}}
            />
          </Grid>

          <Grid item xs={6}>
            <IconedInputField
              type="select"
              items={status.topLine.fontColor.allowedFrom}
              label="Font Color"
              inputValue={status.topLine.fontColor.value}
              onFocus={() => {
                setActiveComponent("title");
              }}
              onChange={(event) => {
                handleChange(event, ["topLine", "fontColor"]);
              }}
              onBlur={() => {
                resetActiveComponent();
                handleSumbit(["topLine", "fontColor"]);
              }}
              inputError={status.topLine.fontColor.submissionStatus === "error"}
              icon={status.topLine.fontColor.submissionStatus}
              iconId={status.topLine.fontColor.tag}
              iconMessage={status.topLine.fontColor.submissionMessage}
              iconIsButton={false}
              onIconClick={() => {}}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <IconedInputField
              type="select"
              items={status.qrImageSize.allowedFrom}
              label="QR Code Size"
              inputValue={status.qrImageSize.value}
              onFocus={() => {
                setActiveComponent("qr");
              }}
              onChange={(event) => {
                handleChange(event, ["qrImageSize"]);
              }}
              onBlur={() => {
                resetActiveComponent();
                handleSumbit(["qrImageSize"]);
              }}
              inputError={status.qrImageSize.submissionStatus === "error"}
              icon={status.qrImageSize.submissionStatus}
              iconId={status.qrImageSize.tag}
              iconMessage={status.qrImageSize.submissionMessage}
              iconIsButton={false}
              onIconClick={() => {}}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <IconedInputField
              type="select"
              items={status.paragraphCount.allowedFrom}
              label="Number of Paragraphs Below QR Code"
              inputValue={status.paragraphCount.value}
              onFocus={() => {
                setActiveComponent("par");
              }}
              onChange={(event) => {
                handleChange(event, ["paragraphCount"]);
              }}
              onBlur={() => {
                resetActiveComponent();
                handleSumbit(["paragraphCount"]);
              }}
              inputError={status.paragraphCount.submissionStatus === "error"}
              icon={status.paragraphCount.submissionStatus}
              iconId={status.paragraphCount.tag}
              iconMessage={status.paragraphCount.submissionMessage}
              iconIsButton={false}
              onIconClick={() => {}}
            />
          </Grid>

          {status.paragraphCount.value > 0 && (
            <Grid item xs={12}>
              <IconedInputField
                type="text"
                label="Paragraph 1 Text"
                inputValue={status.paragraph1.text.value}
                onFocus={() => {
                  setActiveComponent("par1");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph1", "text"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph1", "text"]);
                }}
                inputError={status.paragraph1.text.submissionStatus === "error"}
                icon={status.paragraph1.text.submissionStatus}
                iconId={status.paragraph1.text.tag}
                iconMessage={status.paragraph1.text.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 0 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph1.fontSize.allowedFrom}
                label="Font Size"
                inputValue={status.paragraph1.fontSize.value}
                onFocus={() => {
                  setActiveComponent("par1");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph1", "fontSize"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph1", "fontSize"]);
                }}
                inputError={
                  status.paragraph1.fontSize.submissionStatus === "error"
                }
                icon={status.paragraph1.fontSize.submissionStatus}
                iconId={status.paragraph1.fontSize.tag}
                iconMessage={status.paragraph1.fontSize.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 0 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph1.alignment.allowedFrom}
                label="Alignment"
                inputValue={status.paragraph1.alignment.value}
                onFocus={() => {
                  setActiveComponent("par1");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph1", "alignment"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph1", "alignment"]);
                }}
                inputError={
                  status.paragraph1.alignment.submissionStatus === "error"
                }
                icon={status.paragraph1.alignment.submissionStatus}
                iconId={status.paragraph1.alignment.tag}
                iconMessage={status.paragraph1.alignment.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 0 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph1.fontColor.allowedFrom}
                label="Font Color"
                inputValue={status.paragraph1.fontColor.value}
                onFocus={() => {
                  setActiveComponent("par1");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph1", "fontColor"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph1", "fontColor"]);
                }}
                inputError={
                  status.paragraph1.fontColor.submissionStatus === "error"
                }
                icon={status.paragraph1.fontColor.submissionStatus}
                iconId={status.paragraph1.fontColor.tag}
                iconMessage={status.paragraph1.fontColor.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={12} md={6}>
              <IconedInputField
                type="checkbox"
                label="Space after paragraph"
                inputValue={status.paragraph1.spaceAfter.value}
                onFocus={() => {
                  setActiveComponent("par1");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph1", "spaceAfter"], false);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph1", "spaceAfter"]);
                }}
                inputError={
                  status.paragraph1.spaceAfter.submissionStatus === "error"
                }
                icon={status.paragraph1.spaceAfter.submissionStatus}
                iconId={status.paragraph1.spaceAfter.tag}
                iconMessage={status.paragraph1.spaceAfter.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={12}>
              <TextField
                label="Paragraph 2 Text"
                variant="outlined"
                fullWidth
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onBlur={resetActiveComponent}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={6} sm={6}>
              <TextField
                label="Font Size"
                variant="outlined"
                select
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                  },
                }}
                fullWidth
                value={paragraphProperties[1].fontSize}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    old[0],
                    { ...old[1], fontSize: event.target.value },
                    old[2],
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onBlur={resetActiveComponent}
              >
                {sizes.map((size, index) => (
                  <MenuItem key={index} value={index}>
                    {size}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={6} sm={6}>
              <TextField
                label="Alignment"
                variant="outlined"
                select
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                  },
                }}
                fullWidth
                value={paragraphProperties[1].alignment}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    old[0],
                    { ...old[1], alignment: event.target.value },
                    old[2],
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onBlur={resetActiveComponent}
              >
                {alignments.map((align, index) => (
                  <MenuItem key={index} value={index}>
                    {align}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Color"
                variant="outlined"
                select
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                  },
                }}
                fullWidth
                value={paragraphProperties[1].color}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    old[0],
                    { ...old[1], color: event.target.value },
                    old[2],
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onBlur={resetActiveComponent}
              >
                {colors.map((color, index) => (
                  <MenuItem key={index} value={index}>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={paragraphProperties[1].spaceAfter}
                    onChange={(event) => {
                      setParagraphProperties((old) => [
                        old[0],
                        { ...old[1], spaceAfter: event.target.checked },
                        old[2],
                      ]);
                    }}
                    onFocus={() => {
                      setActiveComponent("par2");
                    }}
                    onBlur={resetActiveComponent}
                  />
                }
                label="Space after paragraph"
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={12}>
              <TextField
                label="Paragraph 3 Text"
                variant="outlined"
                fullWidth
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onBlur={resetActiveComponent}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={6} sm={6}>
              <TextField
                label="Font Size"
                variant="outlined"
                select
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                  },
                }}
                fullWidth
                value={paragraphProperties[2].fontSize}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    old[0],
                    old[1],
                    { ...old[2], fontSize: event.target.value },
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onBlur={resetActiveComponent}
              >
                {sizes.map((size, index) => (
                  <MenuItem key={index} value={index}>
                    {size}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={6} sm={6}>
              <TextField
                label="Alignment"
                variant="outlined"
                select
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                  },
                }}
                fullWidth
                value={paragraphProperties[2].alignment}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    old[0],
                    old[1],
                    { ...old[2], alignment: event.target.value },
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onBlur={resetActiveComponent}
              >
                {alignments.map((align, index) => (
                  <MenuItem key={index} value={index}>
                    {align}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={12} md={6}>
              <TextField
                label="Color"
                variant="outlined"
                select
                SelectProps={{
                  MenuProps: {
                    disableScrollLock: true,
                  },
                }}
                fullWidth
                value={paragraphProperties[2].color}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    old[0],
                    old[1],
                    { ...old[2], color: event.target.value },
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onBlur={resetActiveComponent}
              >
                {colors.map((color, index) => (
                  <MenuItem key={index} value={index}>
                    {color}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
        </Grid>
        {isSmallScreen && (
          <div>
            <div
              className={classes.pdfContainer}
              style={{ justifyContent: "center" }}
            >
              {pdfPage}
            </div>
            <div
              className={[
                classes.animationContainer,
                classes.hoverAnimationContainer,
              ].join(" ")}
              style={{
                opacity: animationSetting.opacity,
              }}
              ref={iconContainer}
            />
          </div>
        )}
      </div>
      {!isSmallScreen && (
        <div
          className={classes.pdfContainer}
          style={{ position: "fixed", right: 0, top: "10vh" }}
        >
          {pdfPage}
          <div
            className={classes.animationContainer}
            style={{
              opacity: animationSetting.opacity,
            }}
            ref={iconContainer}
          />
        </div>
      )}
    </div>
  );
}

const useClasses = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  controlContainer: {
    padding: theme.spacing(1),
    flexGrow: 1,
  },
  pdfContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formContainer: {
    marginTop: theme.spacing(2),
  },
  animationContainer: {
    transition: "all 0.25s ease-out",
    overflow: "hidden",
    width: 50,
    height: 50,
  },
  hoverAnimationContainer: {
    position: "fixed",
    bottom: 16,
    right: 16,
  },
}));
