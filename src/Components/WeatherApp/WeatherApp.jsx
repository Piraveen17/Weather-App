import React, { useState, useEffect } from "react";
import "./WeatherApp.css";

import search_icon from "../images/search1.png";
import cloud_icon from "../images/cloud.png";
import drizzle_icon from "../images/drizzle.png";
import humidity_icon from "../images/humidity.png";
import rain_icon from "../images/rain.png";
import snow_icon from "../images/snow.png";
import wind_icon from "../images/wind.png";
import sun_icon from "../images/sun.png";

export const WeatherApp = () => {
  const initialCity = "Jaffna";
  const initialWeatherDataJaffna = {
    weather: [{ icon: "01d" }],
    name: initialCity,
    main: { temp: 26, humidity: 50 },
    wind: { speed: 18 },
  };

  const [initialWeatherData, SetinitialWeatherData] = useState(
    initialWeatherDataJaffna
  );
  const [city, setCity] = useState(initialCity);
  const [weatherData, setWeatherData] = useState(initialWeatherData);
  const [error, setError] = useState(null);
  const [wicon, setWicon] = useState(cloud_icon);
  const [initialLoad, setInitialLoad] = useState(true);

  const API_KEY = "d891de0ef8ccb2e9286e9088f8c9865c";

 
  useEffect(() => {
    if (initialLoad) {
      fetchWeatherData();
      setInitialLoad(false); 
    }
  }, [initialLoad]); 


  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeatherData(data);
      iconCheck(weatherData);
      setError(null);
    } catch (error) {
      setError("City not found");
      setWeatherData(initialWeatherData);
      alert(error);
    }
  };

  const iconCheck = (weatherData) => {
    if (
      weatherData.weather[0].icon === "01d" ||
      weatherData.weather[0].icon === "01n"
    ) {
      setWicon(sun_icon);
    } else if (
      weatherData.weather[0].icon === "02d" ||
      weatherData.weather[0].icon === "02n"
    ) {
      setWicon(cloud_icon);
    } else if (
      weatherData.weather[0].icon === "03d" ||
      weatherData.weather[0].icon === "03n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      weatherData.weather[0].icon === "04d" ||
      weatherData.weather[0].icon === "04n"
    ) {
      setWicon(drizzle_icon);
    } else if (
      weatherData.weather[0].icon === "09d" ||
      weatherData.weather[0].icon === "09n"
    ) {
      setWicon(rain_icon);
    } else if (
      weatherData.weather[0].icon === "10d" ||
      weatherData.weather[0].icon === "10n"
    ) {
      setWicon(rain_icon);
    } else if (
      weatherData.weather[0].icon === "13d" ||
      weatherData.weather[0].icon === "13n"
    ) {
      setWicon(snow_icon);
    } else {
      setWicon(sun_icon);
    }
  };

  const handleClick = (event) => {
    //event.preventDefault();
    if (city.trim() !== "") {
      fetchWeatherData();
    } else if (city.trim() == "") {
      alert("Enter the city name");
    }
  };

  return (
    <div className="animation">
      <div className="container">
        <div className="input-bar">
          <input
            type="text"
            className="search-bar"
            placeholder="Search"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
            }}
          />
          <img src={search_icon} onClick={handleClick} />
        </div>
        <div className="weather-img">
          <img src={wicon} alt="Cloud" />
        </div>
        <div className="temp"> {weatherData.main.temp}℃ </div>
        <div className="weather-location">{weatherData.name}</div>
        <div className="weather-data">
          <div className="element">
            <img src={humidity_icon} alt="Humidity" className="icons" />
            <div className="data">
              <div className="humidity-percentage">
                {weatherData.main.humidity}%
              </div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="Wind" className="icons" />
            <div className="data">
              <div className="wind-level">{weatherData.wind.speed} km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
