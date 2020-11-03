import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import PDFPage from "./PDFPage";
import IconedInputField from "./IconedInputField";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function Customize() {
  const auth = useSelector((state) => state.auth);

  const [activeComponent, setActiveComponent] = useState("");
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
        value: 3,
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
      target.submissionStatus =
        target.submissionStatus === "done" ? "" : target.submissionStatus;

      return newStatus;
    });
  };

  /**
   * Handles the submission of new values to the back-end.
   *
   * @param {Array} field This argument is an array of strings.
   */
  const handleSumbit = (field) => {
    let property = status[field[0]];
    for (let i = 1; i < field.length; i++) {
      property = property[field[i]];
    }

    const fieldValue = property.value;
    const oldFieldValue = property.lastSubmittedValue;

    if (fieldValue === oldFieldValue) return;

    const values = [{ field: field, value: fieldValue }];

    fetch("/business/downloadpdf/settings", {
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

            let target = newStatus[field[0]];
            for (let i = 1; i < field.length; i++) {
              target = target[field[i]];
            }

            target.submissionStatus = "done";
            target.submissionMessage = "Stored successfully.";
            target.lastSubmittedValue = fieldValue;

            return newStatus;
          });
        } else {
          setStatus((old) => {
            const newStatus = { ...old };

            let target = newStatus[field[0]];
            for (let i = 1; i < field.length; i++) {
              target = target[field[i]];
            }

            target.submissionStatus = "error";
            target.submissionMessage = "Something went wrong. Try again later.";

            return newStatus;
          });
        }
      })
      .catch((error) => {
        setStatus((old) => {
          const newStatus = { ...old };

          let target = newStatus[field[0]];
          for (let i = 1; i < field.length; i++) {
            target = target[field[i]];
          }

          target.submissionStatus = "error";
          target.submissionMessage =
            "Something went wrong. Contact the administrator.";

          return newStatus;
        });
      });
  };

  /**
   * Loads the initial values of the status from the back-end.
   */
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
        <Typography variant="body1">
          You can change the following setting. We will store them as you are
          editing.
        </Typography>
        <Grid
          container
          className={classes.formContainer}
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
              <IconedInputField
                type="text"
                label="Paragraph 2 Text"
                inputValue={status.paragraph2.text.value}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph2", "text"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph2", "text"]);
                }}
                inputError={status.paragraph2.text.submissionStatus === "error"}
                icon={status.paragraph2.text.submissionStatus}
                iconId={status.paragraph2.text.tag}
                iconMessage={status.paragraph2.text.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph2.fontSize.allowedFrom}
                label="Font Size"
                inputValue={status.paragraph2.fontSize.value}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph2", "fontSize"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph2", "fontSize"]);
                }}
                inputError={
                  status.paragraph2.fontSize.submissionStatus === "error"
                }
                icon={status.paragraph2.fontSize.submissionStatus}
                iconId={status.paragraph2.fontSize.tag}
                iconMessage={status.paragraph2.fontSize.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph2.alignment.allowedFrom}
                label="Alignment"
                inputValue={status.paragraph2.alignment.value}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph2", "alignment"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph2", "alignment"]);
                }}
                inputError={
                  status.paragraph2.alignment.submissionStatus === "error"
                }
                icon={status.paragraph2.alignment.submissionStatus}
                iconId={status.paragraph2.alignment.tag}
                iconMessage={status.paragraph2.alignment.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 1 && (
            <Grid item xs={12} md={6}>
              <IconedInputField
                type="select"
                items={status.paragraph2.fontColor.allowedFrom}
                label="Font Color"
                inputValue={status.paragraph2.fontColor.value}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph2", "fontColor"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph2", "fontColor"]);
                }}
                inputError={
                  status.paragraph2.fontColor.submissionStatus === "error"
                }
                icon={status.paragraph2.fontColor.submissionStatus}
                iconId={status.paragraph2.fontColor.tag}
                iconMessage={status.paragraph2.fontColor.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={12} md={6}>
              <IconedInputField
                type="checkbox"
                label="Space after paragraph"
                inputValue={status.paragraph2.spaceAfter.value}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph2", "spaceAfter"], false);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph2", "spaceAfter"]);
                }}
                inputError={
                  status.paragraph2.spaceAfter.submissionStatus === "error"
                }
                icon={status.paragraph2.spaceAfter.submissionStatus}
                iconId={status.paragraph2.spaceAfter.tag}
                iconMessage={status.paragraph2.spaceAfter.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={12}>
              <IconedInputField
                type="text"
                label="Paragraph 3 Text"
                inputValue={status.paragraph3.text.value}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph3", "text"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph3", "text"]);
                }}
                inputError={status.paragraph3.text.submissionStatus === "error"}
                icon={status.paragraph3.text.submissionStatus}
                iconId={status.paragraph3.text.tag}
                iconMessage={status.paragraph3.text.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph3.fontSize.allowedFrom}
                label="Font Size"
                inputValue={status.paragraph3.fontSize.value}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph3", "fontSize"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph3", "fontSize"]);
                }}
                inputError={
                  status.paragraph3.fontSize.submissionStatus === "error"
                }
                icon={status.paragraph3.fontSize.submissionStatus}
                iconId={status.paragraph3.fontSize.tag}
                iconMessage={status.paragraph3.fontSize.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={6} sm={6}>
              <IconedInputField
                type="select"
                items={status.paragraph3.alignment.allowedFrom}
                label="Alignment"
                inputValue={status.paragraph3.alignment.value}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph3", "alignment"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph3", "alignment"]);
                }}
                inputError={
                  status.paragraph3.alignment.submissionStatus === "error"
                }
                icon={status.paragraph3.alignment.submissionStatus}
                iconId={status.paragraph3.alignment.tag}
                iconMessage={status.paragraph3.alignment.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
            </Grid>
          )}

          {status.paragraphCount.value > 2 && (
            <Grid item xs={12} md={6}>
              <IconedInputField
                type="select"
                items={status.paragraph3.fontColor.allowedFrom}
                label="Font Color"
                inputValue={status.paragraph3.fontColor.value}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onChange={(event) => {
                  handleChange(event, ["paragraph3", "fontColor"]);
                }}
                onBlur={() => {
                  resetActiveComponent();
                  handleSumbit(["paragraph3", "fontColor"]);
                }}
                inputError={
                  status.paragraph3.fontColor.submissionStatus === "error"
                }
                icon={status.paragraph3.fontColor.submissionStatus}
                iconId={status.paragraph3.fontColor.tag}
                iconMessage={status.paragraph3.fontColor.submissionMessage}
                iconIsButton={false}
                onIconClick={() => {}}
              />
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
          </div>
        )}
      </div>

      {!isSmallScreen && (
        <div
          className={classes.pdfContainer}
          style={{ position: "sticky", top: "10vh" }}
        >
          {pdfPage}
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
}));
