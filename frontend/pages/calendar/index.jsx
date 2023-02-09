import Calendar from "@components/Calendar/Calendar";
import React from "react";
// import styles from './calendar.module.scss'

const index = () => {
  const name = JSON.parse(localStorage.getItem("user")).name;
  console.log("name");
  console.log(name);
  return (
    <div className="m-24">
      <h1>{name}</h1>
      <Calendar committeeName="global" />
    </div>
  );
};

export default index;
