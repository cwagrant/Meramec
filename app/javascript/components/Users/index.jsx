import React from "react";
import { default as Index } from "./Users";
import Show from "./User";
import New from "./NewUser";
import Edit from "./EditUser";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../Breadcrumbs";
import useAxios from "../useAxios";
import * as paths from "../PathHelper";
import { useSnackbar } from "notistack";

const Users = ({ children }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const axios = useAxios(enqueueSnackbar);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return () => {
      setUser(null);
    };
  }, []);

  React.useEffect(() => {
    if (userId) {
      axios
        .get(paths.API.USERS(userId))
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          enqueueSnackbar(
            `Unable to find user with id ${userId}`,
            { variant: "error" },
          );
          navigate("/users");
        });
    }
  }, [userId]);

  return (
    <div className="property">
      <Breadcrumbs
        user={user}
      />
      {children}
      <Outlet
        context={{ user, setUser }}
      />
    </div>
  );
};

Users.Index = Index;
Users.Show = Show;
Users.Edit = Edit;
Users.New = New;

export default Users;
