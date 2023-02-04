import Calendar from "@components/Calendar/Calendar";
import React from "react";
import styles from "./calendar.module.scss";

const Calendarr = () => {
  return (
    <div className="m-24">
      <Calendar committeeName="global" />
    </div>
  );
};

export default Calendarr;
