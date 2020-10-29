import React, { useState, useRef } from "react";
import { useMediaQuery } from "react-responsive";

import lottie from "lottie-web";

import PDFPage from "./PDFPage";

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
  const parCount = ["None", "One", "Two", "Three"];
  const alignments = ["Left", "Right", "Center", "Justify"];

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

  const pdfPage = (
    <PDFPage
      activeComponent={activeComponent}
      titleColor={colors[topLineProperties.color].toLowerCase()}
      parCount={paragraphCountProperties.count}
      par1Algin={alignments[paragraphProperties[0].alignment].toLowerCase()}
      par1Color={colors[paragraphProperties[0].color].toLowerCase()}
      par1SpaceAfter={paragraphProperties[0].spaceAfter}
      par2Algin={alignments[paragraphProperties[1].alignment].toLowerCase()}
      par2Color={colors[paragraphProperties[1].color].toLowerCase()}
      par2SpaceAfter={paragraphProperties[1].spaceAfter}
      par3Algin={alignments[paragraphProperties[2].alignment].toLowerCase()}
      par3Color={colors[paragraphProperties[2].color].toLowerCase()}
      par3SpaceAfter={paragraphProperties[2].spaceAfter}
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
          <Grid item xs={12} sm={12}>
            <TextField
              label="Top Line Text"
              variant="outlined"
              fullWidth
              onChange={(event) => {
                event.persist();
                setTopLineProperties((old) => ({
                  ...old,
                  text: event.target.value,
                }));
              }}
              onFocus={() => {
                setActiveComponent("title");
              }}
              onBlur={resetActiveComponent}
            />
          </Grid>

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
              value={topLineProperties.fontSize}
              onChange={(event) => {
                setTopLineProperties((old) => ({
                  ...old,
                  fontSize: event.target.value,
                }));
              }}
              onFocus={() => {
                setActiveComponent("title");
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

          <Grid item xs={6} sm={6}>
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
              value={topLineProperties.color}
              onChange={(event) => {
                setTopLineProperties((old) => ({
                  ...old,
                  color: event.target.value,
                }));
              }}
              onFocus={() => {
                setActiveComponent("title");
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

          <Grid item xs={12} md={6}>
            <TextField
              label="QR Code Size"
              variant="outlined"
              select
              SelectProps={{
                MenuProps: {
                  disableScrollLock: true,
                },
              }}
              fullWidth
              value={qrCodeProperties.size}
              onChange={(event) => {
                setQrCodeProperties((old) => ({
                  ...old,
                  size: event.target.value,
                }));
              }}
              onFocus={() => {
                setActiveComponent("qr");
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

          <Grid item xs={12} md={6}>
            <TextField
              label="Number of Paragraphs Below QR Code"
              variant="outlined"
              select
              SelectProps={{
                MenuProps: {
                  disableScrollLock: true,
                },
              }}
              fullWidth
              value={paragraphCountProperties.count}
              onChange={(event) => {
                setParagraphCountProperties((old) => ({
                  ...old,
                  count: event.target.value,
                }));
              }}
              onFocus={() => {
                setActiveComponent("par");
              }}
              onBlur={resetActiveComponent}
            >
              {parCount.map((count, index) => (
                <MenuItem key={index} value={index}>
                  {count}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {paragraphCountProperties.count > 0 && (
            <Grid item xs={12}>
              <TextField
                label="Paragraph 1 Text (Multiline)"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                onFocus={() => {
                  setActiveComponent("par1");
                }}
                onBlur={resetActiveComponent}
              />
            </Grid>
          )}

          {paragraphCountProperties.count > 0 && (
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
                value={paragraphProperties[0].fontSize}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    { ...old[0], fontSize: event.target.value },
                    old[1],
                    old[2],
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par1");
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

          {paragraphCountProperties.count > 0 && (
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
                value={paragraphProperties[0].alignment}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    { ...old[0], alignment: event.target.value },
                    old[1],
                    old[2],
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par1");
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

          {paragraphCountProperties.count > 0 && (
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
                value={paragraphProperties[0].color}
                onChange={(event) => {
                  setParagraphProperties((old) => [
                    { ...old[0], color: event.target.value },
                    old[1],
                    old[2],
                  ]);
                }}
                onFocus={() => {
                  setActiveComponent("par1");
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

          {paragraphCountProperties.count > 0 && (
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={paragraphProperties[0].spaceAfter}
                    onChange={(event) => {
                      setParagraphProperties((old) => [
                        { ...old[0], spaceAfter: event.target.checked },
                        old[1],
                        old[2],
                      ]);
                    }}
                    onFocus={() => {
                      setActiveComponent("par1");
                    }}
                    onBlur={resetActiveComponent}
                  />
                }
                label="Space after paragraph"
              />
            </Grid>
          )}

          {paragraphCountProperties.count > 1 && (
            <Grid item xs={12}>
              <TextField
                label="Paragraph 2 Text (Multiline)"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                onFocus={() => {
                  setActiveComponent("par2");
                }}
                onBlur={resetActiveComponent}
              />
            </Grid>
          )}

          {paragraphCountProperties.count > 1 && (
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

          {paragraphCountProperties.count > 1 && (
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

          {paragraphCountProperties.count > 1 && (
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

          {paragraphCountProperties.count > 1 && (
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

          {paragraphCountProperties.count > 2 && (
            <Grid item xs={12}>
              <TextField
                label="Paragraph 3 Text (Multiline)"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                onFocus={() => {
                  setActiveComponent("par3");
                }}
                onBlur={resetActiveComponent}
              />
            </Grid>
          )}

          {paragraphCountProperties.count > 2 && (
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

          {paragraphCountProperties.count > 2 && (
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

          {paragraphCountProperties.count > 2 && (
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

          {paragraphCountProperties.count > 2 && (
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={paragraphProperties[2].spaceAfter}
                    onChange={(event) => {
                      setParagraphProperties((old) => [
                        old[0],
                        old[1],
                        { ...old[2], spaceAfter: event.target.checked },
                      ]);
                    }}
                    onFocus={() => {
                      setActiveComponent("par3");
                    }}
                    onBlur={resetActiveComponent}
                  />
                }
                label="Space after paragraph"
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
    marginBottom: theme.spacing(2),
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
