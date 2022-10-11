import React, { useState, useEffect } from "react";

const CurrentLocation = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7e0fdbf14c28aac7448823feef24d155`
      );
      const data = await res.json();
      console.log(data);

      const resGeo = await fetch(
        `https://geocode.xyz/${latitude},${longitude}?geoit=json&auth=218965128455581846514x55491`
      );
      const dataGeo = await resGeo.json();
      console.log(dataGeo.country);

      const resCountry = await fetch(
        `https://restcountries.eu/rest/v2/${dataGeo.country}`
      );
      const dataCountry = await resCountry.json();
      console.log(dataCountry);
    });
  });

  return (
    <div>
      <p>My place</p>
    </div>
  );
};

export default CurrentLocation;
