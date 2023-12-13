import React, { useEffect, useState } from "react";

export const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [cityWeather, setCityWeather] = useState(null);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchData();
    }
  };

  const fetchData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f00c38e0279b7bc85480c3fe775d518c`)
      .then(res => res.json())
      .then(data => {
        setCityWeather(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };

  return (

    <>
    <div className="weather_details">
    <h1 class="app-name">Weather App<span>🌤</span></h1>
      <input
      className="city-search "
        onKeyDown={handleKeyPress}
        placeholder="Enter city"
        onChange={(event) => setCityName(event.target.value)}
      />

      {cityWeather && (
        <div>
          <div className="city-name">
            <h2>{cityWeather.name}, <span>{cityWeather.sys.country}</span></h2>
          </div>
          <div className="date">
            <span>{new Date(cityWeather.dt * 1000).toLocaleDateString()}</span>
          </div>
          <div className="icon-temp">
            <img className="person_image" src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`} alt="clouds" />
            {cityWeather.main.temp}<sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{cityWeather.weather[0].description}</p>
            <p>Wind Speed: {cityWeather.wind.speed} m/s</p>
          </div>
        </div>
      )}
      </div>
    </>

  );
};
