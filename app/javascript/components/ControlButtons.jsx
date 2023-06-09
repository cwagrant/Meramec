import React from "react";
import { Box, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import useAxios from "./useAxios";

const ControlButtons = (
  { newUrl, editUrl, printUrl, deleteCallback, prefixButton },
) => {
  const axios = useAxios();
  const authorizePrint = () => {
    axios.get(printUrl, { responseType: "blob" })
      .then((res) => {
        console.log(res);
        const href = URL.createObjectURL(res.data);
        const link = document.createElement("a");
        const fileName =
          res?.headers["content-disposition"].split("filename=")[1].split(
            ";",
          )[0];

        console.log(fileName);
        link.href = href;
        link.setAttribute("download", fileName || Date.now());
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
      {prefixButton}
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
            authorizePrint();
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
