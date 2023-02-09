import Calendar from "@components/Calendar/Calendar";
import React from "react";
import styles from "./calendar.module.scss";

const index = () => {
  let name = "";
  let committeeName = "";
  if (JSON.parse(localStorage.getItem("user"))) {
    name =
      JSON.parse(localStorage.getItem("user")).name +
      ":" +
      JSON.parse(localStorage.getItem("user")).type;
    committeeName = JSON.parse(localStorage.getItem("user")).name;
  }
  return (
    <div className="m-24">
      <h1 class="text-6xl ml-5">{name}</h1>
      <Calendar committeeName={committeeName} />
    </div>
  );
};

export default index;
