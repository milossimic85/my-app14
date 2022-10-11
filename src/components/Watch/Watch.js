import React, { useState, useEffect } from "react";
import classes from "./Watch.module.css";

const Watch = () => {
  const [time, setTime] = useState();

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);
  });
  return (
    <div className={classes.timer}>
      <p className={classes.details}>{time}</p>
    </div>
  );
};

export default Watch;
