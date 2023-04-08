import React from "react";
import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import useAxios from "./useAxios";
import axios from "axios";

const ControlButtons = ({ newUrl, editUrl, printUrl, deleteCallback }) => {
  const myAxios = useAxios();
  // const authorizePrintOld = () => {
  //   axios.get(printUrl, { responseType: "blob" })
  //     .then((res) => {
  //       console.log(res);
  //       const href = URL.createObjectURL(res.data);
  //       const link = document.createElement("a");
  //       const fileName =
  //         res?.headers["content-disposition"].split("filename=")[1].split(
  //           ";",
  //         )[0];
  //
  //       console.log(fileName);
  //       link.href = href;
  //       link.setAttribute("download", fileName || Date.now());
  //       document.body.appendChild(link);
  //       link.click();
  //
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(href);
  //     });
  // };

  const getPrint = () => {
    myAxios.get(printUrl)
      .then((res) => {
        const { html, key } = res.data;
        getPrint2(html, key);
      });
  };
  const getPrint2 = (myHTML, key) => {
    if (!myHTML) return;
    axios.post(
      `https://chrome.browserless.io/pdf?token=${key}`,
      { "html": myHTML, options: { scale: "0.75" } },
      {
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Accept, Content-Type",
        },
        responseType: "blob",
      },
    ).then((res) => {
      const href = URL.createObjectURL(res.data);
      const link = document.createElement("a");

      link.href = href;
      link.setAttribute("download", Date.now());
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        mb: 2,
        gap: 2,
      }}
    >
      {newUrl && (
        <Button
          component={RouterLink}
          to={newUrl}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
      )}
      {editUrl && (
        <Button
          component={RouterLink}
          to={editUrl}
          variant="outlined"
          startIcon={<EditIcon />}
        >
          Edit
        </Button>
      )}
      {printUrl && (
        <Button
          variant="outlined"
          onClick={() => {
            getPrint();
          }}
          startIcon={<PrintIcon />}
        >
          Print
        </Button>
      )}
      {deleteCallback && (
        <Button
          variant="contained"
          color="error"
          onClick={() => deleteCallback()}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      )}
    </Box>
  );
};

export default ControlButtons;
