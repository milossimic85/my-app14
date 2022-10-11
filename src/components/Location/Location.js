import React, { useState } from "react";
import classes from "./Location.module.css";
import { ToastContainer, toast } from "react-toastify";

const Location = () => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState(null);

  const whereIAm = (lat, lon) => {
    fetch(
      `https://geocode.xyz/${lat},${lon}?geoit=json&auth=218965128455581846514x55491`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);

        return res.json();
      })
      .then((data) => {
        console.log(data.city);
        setLocation(data.city);
      })
      .catch((err) => console.error(err.message));
  };

  const geoHandler = () => {
    setShow(true);
    whereIAm(44.226341, 22.53093);
    toast.success(location);
  };

  return (
    <div className={classes.button}>
      <button onClick={geoHandler}>
        <p>Where I am?</p>
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Location;
