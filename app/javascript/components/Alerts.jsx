import React from "react";
import { Alert } from "@mui/material";

const Errors = ({ errors, warnings, info, success }) => {
  if (!errors && !warnings && !info && !success) return "";

  return (
    <ul>
      {errors.map((msg) => {
        return <Alert severity="error">{msg}</Alert>;
      })}
      {warnings.map((msg) => {
        return <Alert severity="warning">{msg}</Alert>;
      })}
      {info.map((msg) => {
        return <Alert severity="info">{msg}</Alert>;
      })}
      {success.map((msg) => {
        return <Alert severity="success">{msg}</Alert>;
      })}
    </ul>
  );
};

export default Errors;
