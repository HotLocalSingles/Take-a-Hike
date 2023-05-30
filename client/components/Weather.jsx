import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';

/*
The weather component has 4 parts: The location, air quality, live weather details
and weather warnings. It is designed as a box/container that is interactive for the user.
They should be able to input their location (using lat and long) and have the other
parts render the data about that location. I will need to look into whether or not the trail
information is being saved. Then perhaps I can make the location a drop down list of the
saved trails information
*/
const Weather = () => {
  //I'm going to separate each part of the weather component into it's own functionality
  //since they all will be designed in specific ways to take in specific data

  //the first part is the location drop down menu that allows a user to select from
  //the list of trails they have saved to the database (based on name of trail)
  const LocationDropDown = () => {
    const [locations, setLocations] = useState([]);
    const [currentLocation, setCurrentLocation] = useState('');

    useEffect(() => {
      //fetch trail names from database when component mounts
      const fetchLocations = async () => {
        try {
          const response = await axios.get('/api/trailnames');
          console.log('axios get weather', response.data);
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

    //the template of the location drop down
    return (
      <Select value={currentLocation} onChange={handleLocationChange}>
        {locations.map((location, index) => (
          <MenuItem value={location} key={index}>
            {location.name || ''}
          </MenuItem>
        ))}
      </Select>
    );
  };









  return(
    <Container>
      <div>Weather component</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <LocationDropDown handleLocationChange={setCurrentLocation} />
      <AirQuality location={currentLocation} />
      </div>
      {/* <WeatherTabView weatherData={weatherData} />
      <WeatherWarnings warnings={warnings} /> */}
    </Container>

  )
};

export default Weather;