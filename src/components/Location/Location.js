import React, { useState } from "react";
import classes from "./Location.module.css";
import { ToastContainer, toast } from "react-toastify";
import { GEO_CODE_API, geoKey } from "../api";

const Location = () => {
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState(null);

  const whereIAm = (lat, lon) => {
    fetch(`${GEO_CODE_API}/${lat},${lon}?geoit=json&auth=${geoKey}`)
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
