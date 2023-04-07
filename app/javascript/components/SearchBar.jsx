import React from "react";
import { Box, Button, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { Link as RouterLink } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar = (
  { onChange, newUrl, editUrl, TextFieldProps },
) => {
  const debouncedChangeHandler = React.useCallback(
    debounce(onChange, 300),
    [],
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
          width: 1,
          maxWidth: "lg",
          gap: 1,
        }}
      >
        <TextField
          {...TextFieldProps}
          id="property-search"
          label="Search"
          variant="filled"
          onChange={debouncedChangeHandler}
          type="text"
        />
        <Box
          sx={{
            flexShrink: 1,
            alignSelf: "flex-end",
            display: "flex",
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
        </Box>
      </Box>
    </>
  );
};

export default SearchBar;
