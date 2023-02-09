import React from "react";
import classes from "./Backdrop.module.scss";

const backdrop = (props) => {
  return props.show ? (
    <div className={classes.Backdrop} onClick={props.removeBackdrop}></div>
  ) : null;
};

export default backdrop;
