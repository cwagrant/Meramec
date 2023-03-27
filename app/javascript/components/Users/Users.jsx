import React from "react";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";

import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import useNotifications from "../useNotifications";

const Records = ({ users }) => {
  return users.map(({ id, email }) => (
    <TableRow key={id}>
      <TableCell>{id}</TableCell>
      <TableCell>
        <Link component={RouterLink} to={"/users/" + id}>
          {email}
        </Link>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link component={RouterLink} to={"/users/" + id}>
            <LaunchIcon />
          </Link>
          <Link component={RouterLink} to={"/users/" + id + "/edit"}>
            <EditIcon />
          </Link>
          <Link component={RouterLink} to={"/users/" + id}>
            <DeleteIcon />
          </Link>
        </Box>
      </TableCell>
    </TableRow>
  ));
};

const Users = () => {
  const [query, setQuery] = React.useState("");
  const [data, setData] = React.useState();
  const { userId } = useParams();
  const { pushNotification } = useNotifications();
  const axios = useAxios();

  const changeHandler = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    queryUsers();
  }, [query]);

  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300),
    [],
  );

  const deleteUser = (id) => {
    axios
      .delete(paths.API.USERS(id))
      .then((res) => {
        queryUsers();
      })
      .catch((error) => {
        pushNotification(`Unable to delete User ${id}`, "error");
        console.log(error);
      });
  };

  const queryUsers = () => {
    axios
      .get(paths.API.USERS(), {
        params: { search: query },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        pushNotification(
          "Looks like there was an error in finding the existing users",
          "error",
        );
        console.log(error);
      });
  };

  return (
    <>
      <TextField
        sx={{ mb: 2, width: 1, maxWidth: "md" }}
        id="property-search"
        label="Search for users by name..."
        variant="filled"
        onChange={debouncedChangeHandler}
        type="text"
      />
      <Box
        sx={{
          my: 1,
          display: "flex",
          justifyContent: "flex-end",
          width: 1,
          maxWidth: "md",
        }}
      >
        <Button
          component={RouterLink}
          to={"./users/new"}
          variant="outlined"
          startIcon={<AddBoxIcon />}
        >
          New
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxWidth: "md" }}>
        <Table aria-label="users listing">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 32 }} />
              <TableCell>User</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              <Records users={data} deleteCallback={deleteUser} />}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
