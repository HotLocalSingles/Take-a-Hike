import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

/*
The weather component has 3 parts: The location, live weather details
and weather warnings. It is designed as a box/container that is interactive for the user.
They should be able to input their location (using drop down from trails list)
and have the other parts render the data about that location
*/
const Weather = () => {
  const [locations, setLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');
  const [weather, setWeather] = useState(null);
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

  //weather component is designed to render the weather
  //info from the api based on the currentLocation
  //the api takes in a latitude (first) and longitude (second)
  //and it only takes numbers separated by a comma
  //ex: api_url.gov/78,65
  const Weather = ({ location }) => {
    useEffect(() => {
      const fetchWeather = async () => {
        if (location) {
          try {
            const response = await axios
            .get(`https://api.weather.gov/points/${location.lat},${location.lon}/forecast/hourly`);
            // setWeather(response.data);
            console.log('axios get weather', response.data);
          } catch (error) {
            console.error('Failed to fetch weather data', error);
          }
        }
      };
      fetchWeather();
    }, [currentLocation]);
    //Weather will display the current weather forecast and info for currentLocation
    return (
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
          }}
        >
        {/* weather data */}
        </Box>
      );
  };

  //the weather warnings return any weather alerts from the currentLocation
  //it will make a call to an external api whenever the currentLocation changes
  const WeatherWarnings = ({ location }) => {
    useEffect(() => {
      const fetchWarnings = async () => {
        if (location) {
          try {
            const response = await axios.get('/api/weather', {
              params: { latitude: location.latitude, longitude: location.longitude },
            });
            console.log('axios get warnings', response.data);
          } catch (error) {
            console.error('Failed to fetch warnings', error);
          }
        }
      };
      fetchWarnings();
    }, [currentLocation])
    //Warnings is just a box that will display the warning message from currentLocation
    return (
      <Box
      sx={{
        border: '3px solid grey',
        height: '100px',
        width: '400px'
      }}>
        <Typography>
          WARNING:
        </Typography>
      </Box>
    );
  };


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
        value={currentLocation}
        onChange={handleLocationChange}
        sx={{
          backgroundColor: 'white',
          border: '3px solid grey',
          fontSize: '20px'}}>
        {locations.map((location, index) => (
          <MenuItem value={location} key={index}>
            {location.name || ''}
          </MenuItem>
        ))}
      </Select>
      </div>
      <Weather location={currentLocation} />
      <WeatherWarnings location={currentLocation}/>
    </Container>

  )
};

export default Weather;