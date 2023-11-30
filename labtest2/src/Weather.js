import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css'

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState(null);

  const apiKey = '123e8aa1c2f0b51e543271c1c68ebfd2';

  const getWeatherIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  useEffect(() => {
    if (weatherData) {
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,daily,alerts&appid=${apiKey}`)
        .then(response => {
          setForecastData(response.data.hourly);
        })
        .catch(error => {
          console.error('Error fetching forecast data:', error);
        });
    }
  }, [weatherData, apiKey]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleGetWeather = () => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  return (
    <div id="main">
      <h1 id="title">Weather App</h1>
      <div id="th">
        <input
          id="input"
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={handleInputChange}
        />
        <button id="search" onClick={handleGetWeather}>
          Search
        </button>
      </div>
      {weatherData && (
        <div id="bruh">
          <div id="sec">
            <p id="loc">
              {weatherData.name}, {weatherData.sys.country}
            </p>
            <p id="temp">{(weatherData.main.temp - 273.15).toFixed(1)}°C</p>
            <img id='gg'
              src={getWeatherIconUrl(weatherData.weather[0].icon)}
              alt={weatherData.weather[0].description}
            />
            <p id="cond">{weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
      {forecastData && (
        <div id="forecast-container">
          <div id="forecast-box">
            {forecastData.slice(1, 24).map((hour, index) => (
              <div key={index} className="hour-box">
                <p className="hour-time">{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
                <p className="hour-temp">{(hour.temp - 273.15).toFixed(1)}°C</p>
                <img
                  src={getWeatherIconUrl(hour.weather[0].icon)}
                  alt={hour.weather[0].description}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {weatherData && (
        <div id="datas">
          <div className="box" id="one">
            <p className="head">Feels Like:</p> <p className="algor"> {(weatherData.main.feels_like - 273.15).toFixed(1)}°C</p>
          </div>
          <div className="box" id="two">
            <p className="head">Pressure:</p> <p className="algor"> {weatherData.main.pressure} hPa</p>
          </div>
          <div className="box" id="three">
            <p className="head">Cloudiness:</p> <p className="algor"> {weatherData.clouds.all}%</p>
          </div>
          <div className="box" id="four">
            <p className="head">Wind:</p> <p className="algor"> {weatherData.wind.speed} m/s, {weatherData.wind.deg}°</p>
          </div>
          <div className="box" id="five">
            <p className="head">Humidity:</p> <p className="algor"> {weatherData.main.humidity}%</p>
          </div>
          <div className="box" id="six">
            <p className="head">Visibility:</p> <p className="algor"> {weatherData.visibility} meters</p>
          </div>
          <div className="box" id="seven">
            <p className="head">Latitude:</p> <p className="algor"> {weatherData.coord.lat}</p>
          </div>
          <div className="box" id="eight">
            <p className="head">Longitude:</p> <p className="algor">{weatherData.coord.lon}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;