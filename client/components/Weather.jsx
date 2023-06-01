import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/*
The weather component has 3 parts: The location, live weather details
and weather warnings. It is designed as a box/container that is interactive for the user.
They should be able to input their location (using drop down from trails list)
and have the other parts render the data about that location
*/
const Weather = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [weather, setWeather] = useState({});
  const [view, setView] = useState('Daily');

  const weatherCodeNumbers = {
    0: 'clear skies',
    1: 'clear partly cloudy',
    2: 'clear partly cloudy',
    3: 'clear partly cloudy',
    45: 'fog',
    48: 'fog',
    51: 'drizzle light',
    53: 'drizzle moderate',
    55: 'drizzle heavy',
    61: 'rain slight',
    63: 'rain moderate',
    65: 'rain heavy',
    66: 'rain freezing light',
    67: 'rain freezing heavy',
    71: 'snow fall slight',
    73: 'snow fall moderate',
    75: 'snow fall heavy',
    77: 'snow grains',
    80: 'rain showers slight',
    81: 'rain showers moderate',
    82: 'rain showers heavy',
    85: 'snow showers slight',
    86: 'snow showers heavy',
    95: 'thunderstorm slight/moderate',
    96: 'thunderstorm with slight hail',
    99: 'thunderstorm with heavy hail'
  };

  const windDirection = {
    N: '0 - 11.25',
    NNE: '11.25 - 33.75',
    NE: '33.75 - 56.25',
    ENE: '56.25 - 78.75',
    E: '78.75 - 101.25',
    ESE: '101.25 - 123.75',
    SE: '123.75 - 146.25',
    SSE: '146.25 - 168.75',
    S: '168.75 - 191.25',
    SSW: '191.25 - 213.75',
    SW: '213.75 - 236.25',
    WSW: '236.25 - 258.75',
    W: '258.75 - 281.25',
    WNW: '281.25 - 303.75',
    NW: '303.75 - 326.25',
    NNW: '326.25 - 348.75'
};

//use a function to return the correct key value associated with obj
//for wind direction
const windDirectionFunction = (directionNumber) => {
  let direction = null;
  Object.entries(windDirection).forEach(([key, value]) => {
      const [min, max] = value.split(' - ').map(Number);
      if (directionNumber >= min && directionNumber <= max) {
          direction = key;
      }
  });

  return direction;
};

  //I'm going to separate each part of the weather component into it's own functionality
  //since they all will be designed in specific ways to take in specific data

  //the first part is the location drop down menu that allows a user to select from
  //the list of trails they have saved to the database (based on name of trail)
    useEffect(() => {
      //fetch trail names from database when component mounts
      const fetchLocations = async () => {
        try {
          const response = await axios.get('/api/trailnames');
          setLocations(response.data);
        } catch (error) {
          console.error('Client failed to fetch locations', error);
        }
      };
      fetchLocations();
    }, []);

   //handle when a user selects a different location
   const handleLocationChange = (event) => {
      setCurrentLocation(event.target.value);
   };

   //this function is designed to change the view on the WeatherBox
   const handleViewChange = () => {
    setView((prevView) => prevView === 'Daily' ? 'Extended' : 'Daily');
  };

  //separating the useEffect and the api call means only one call
  //pull the data from the external api
  //set current_weather to true to return current_weather object
    const fetchWeather = async (location) => {
      if (location.name) {
        try {
          const response = await axios
          .get(`https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&hourly=temperature_2m&current_weather=true`);
          setWeather(response.data.current_weather);
          // console.log('axios get weather', response.data.current_weather);
          //returns an object with current weather object inside
          // { current_weather: { temperature, time, weathercode, winddirection, windspeed } }
        } catch (error) {
          console.error('Failed to fetch weather data', error);
        }
      }
    };

  useEffect(() => {
    fetchWeather(currentLocation);
  }, [currentLocation]);

  return(
    <Container
    sx={{
      border: '20px solid',
      borderImageSource: 'linear-gradient(to right, green, blue, purple)',
      borderImageSlice: '1',
      height: '600px',
      width: '500px',
      backgroundImage: 'url(https://thumbs.gfycat.com/AgedSingleBasil-size_restricted.gif)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Select
        value={ currentLocation }
        onChange={ handleLocationChange }
        sx={{
          backgroundColor: 'white',
          border: '3px solid grey',
          fontSize: '20px',
          fontWeight: '700',
          color: 'green'
          }}>
        {locations.map((location, index) => (
          <MenuItem value={location} key={index} sx={{ fontWeight: '900' }}>
            {location.name || ''}
          </MenuItem>
        ))}
      </Select>
      <Button variant="outlined" onClick={handleViewChange}>
        {view === 'Daily' ? 'View Extended Data' : 'View Daily Data'}
      </Button>
      </div>
      <Box
        sx={{
        border: '3px solid',
        borderColor: 'grey',
        borderRadius: '10px',
        padding: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        height: '350px',
        width: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
        }}>
        <Typography paragraph style={{ fontWeight: 900, color: 'blue' }}>
          Time: { weather.time }
        </Typography>
                <div style={{ height: '30px'}}></div>
        <Typography paragraph style={{ fontWeight: 900, color: 'blue' }}>
          Temperature: { weather.temperature } C
        </Typography>
                <div style={{ height: '30px'}}></div>
        <Typography paragraph style={{ fontWeight: 900, color: 'blue' }}>
          Wind Direction: { windDirectionFunction(weather.winddirection) }
        </Typography>
                <div style={{ height: '30px'}}></div>
        <Typography paragraph style={{ fontWeight: 900, color: 'blue' }}>
          Wind Speed: { weather.windspeed }
        </Typography>
                <div style={{ height: '30px'}}></div>
        <Typography paragraph style={{ fontWeight: 900, color: 'blue' }}>
          Weather Code: { weather.weathercode }
        </Typography>
      </Box>
      <Box
      sx={{
        border: '3px solid grey',
        height: '100px',
        width: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
      }}>
        <div style={{ height: '30px'}}></div>
        <Typography paragraph style={{ fontWeight: 900, color: 'purple' }}>
          Weather Code Description: { weatherCodeNumbers[weather.weathercode] }
        </Typography>
      </Box>
    </Container>

  );
};

export default Weather;