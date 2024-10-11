import React, { useState, useEffect, useRef } from 'react';
import search_icon from '../asset/search.png';
import clear_icon from '../asset/clear.png';
import drizzle_icon from '../asset/drizzle.png';
import humidity_icon from '../asset/humidity.png';
import rain_icon from '../asset/rain.png';
import snow_icon from '../asset/snow.png';
import wind_icon from '../asset/wind.png';
import cloud_icon from '../asset/cloud.png';
import './Weather.css';

// New imports for error handling and loading state
import error_icon from '../asset/error.jpg';
import loading_icon from '../asset/loading.png';

const Weather = () => {
  const inputRef = useRef(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": rain_icon,
    "11n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": drizzle_icon,
    "50n": drizzle_icon,
  };

  const search = async (city) => {
    if (city === '') {
      alert('Please enter a city name');
      return;
    }
    try {
      const API_ID = '9d184220619301667c957e1979fd1af0'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_ID}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else {
          throw new Error('Failed to fetch weather data');
        }
      }

      const data = await response.json();
      console.log(data);  // Check the API response in the console

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        city: data.name,
        weather: data.weather[0].main,
        icon: icon, 
      });
      setError(null);
    } catch (error) {
      console.log('Error fetching data:', error);
      setWeatherData(null);
      setError(error.message);
    }
  };

  useEffect(() => {
    search('pune'); 
  }, []);

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input type='text' ref={inputRef} placeholder='Search for a city...' />
        <img src={search_icon} alt='Search' onClick={() => search(inputRef.current.value)} />
      </div>

      {error && (
        <div className='error-message'>
          <p>{error}</p>
        </div>
      )}

      {weatherData && ( 
        <>
          <img src={weatherData.icon} alt='Weather Icon' className='weather-icon' />
          
          <p className='Temprature'>{weatherData.temperature}°C</p> 
          <p className='location'>{weatherData.city}</p>
          
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='Humidity Icon' />
              <div>
                <p>{weatherData.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='Wind Icon' />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
