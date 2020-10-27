import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function QRCode() {
  const auth = useSelector((state) => state.auth);

  const [state, setState] = useState({ waitingForQR: true, svg: null });

  useEffect(() => {
    fetch("/business/getcode", {
      cache: "no-cache",
      headers: {
        Authorization: `${auth.type} ${auth.value}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 0) {
          setState(() => ({
            waitingForQR: false,
            svg: encodeURIComponent(data.qr),
          }));
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth]);

  const handleDownloadImage = () => {
    fetch("/business/downloadcode", {
      cache: "no-cache",
      headers: {
        Authorization: `${auth.type} ${auth.value}`,
      },
    })
      .then((response) => response.blob())
      .then((data) => {
        console.log(data);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "QRCode.svg");

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDownloadPdf = () => {
    fetch("/business/downloadpdf", {
      cache: "no-cache",
      headers: {
        Authorization: `${auth.type} ${auth.value}`,
      },
    })
      .then((response) => response.blob())
      .then((data) => {
        console.log(data);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "QRCode.pdf");

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const classes = useClasses();
  if (state.waitingForQR) {
    return <Typography variant="body2">Waiting...</Typography>;
  } else {
    return (
      <Card className={classes.cardContainer}>
        <CardActionArea>
          <CardMedia className={classes.media} title="QR Code">
            <img src={`data:image/svg+xml,${state.svg}`} alt="QR Code" />
          </CardMedia>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleDownloadImage}>
            Download as Image
          </Button>
          <Button size="small" color="primary" onClick={handleDownloadPdf}>
            Download as PDF
          </Button>
        </CardActions>
      </Card>
    );
  }
}

const useClasses = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  cardContainer: {
    maxWidth: 400,
  },
  media: {
    height: 400,
  },
}));
