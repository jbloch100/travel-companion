import React, {useState, useEffect} from 'react'; 
import WeatherInfo from './components/WeatherInfo'; 
import PlacesInfo from './components/PlacesInfo'; 
import MapComponent from './components/MapComponent'; 
import logo from './logo.svg';
import './App.css'; 

const majorCities = {
  'Paris,FR': {lat: 48.8545, lon: 2.3455},
  'Zagreb,HR': {lat: 45.8135, lon: 15.9795},
  'Toronto,CA': {lat: 43.6532, lon: -79.3832}
};


function App() { 
  // State for coordinates 
  const [coordinates, setCoordinates] = useState({ lat:51.5074, lon: -0.1278}); 


  const [location, setLocation] = useState({ city:'', country:'' });


  const handleLocationChange = async (newCity, newCountry) => {
    const locationIqUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&city=${encodeURIComponent(newCity)}&country=${encodeURIComponent(newCountry)}&format=json`;

    const cityKey = `${newCity},${newCountry}`;
    const predefinedLocation = majorCities[cityKey];
    console.log('City Key:', cityKey);
    console.log('Available keys:' , Object.keys(majorCities));

    console.log(majorCities[cityKey]);

    if(predefinedLocation)
    {
      console.log("haha");
      setCoordinates(predefinedLocation);
    }
    else {
      try {
        const response = await fetch(locationIqUrl);
        const data = await response.json();
        
        if(data.length > 0) {
            const {lat, lon} = data[0];
            setCoordinates({lat: parseFloat(lat), lon: parseFloat(lon)});
        } else {
          // Handle no result scenario
          console.log('No location found');
        }
      } catch (error) {
        console.error('Failed to fetch coordinates:', error);
      }

    }
  };
  
  return ( 
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="Logo" />
        <h1>Travel Companion</h1>
        <p>Your guide to the world's weather and points of interest.</p>
      </header>
      <div className="weather-container"> 
        <WeatherInfo onLocationChange={handleLocationChange} />
      </div>
      <div className="map-container"> 
        <MapComponent coordinates={coordinates} />
      </div>
      <div className="places-container"> 
        <PlacesInfo coordinates={coordinates} />
      </div> 
      <footer className="App-footer">
        <p>Copyright &copy; {new Date().getFullYear()} Jonathan Bloch. All rights reserved.</p>
        <p>For inquiries, contact me at <a href="mailto:jonathanbloch100@gmail.com">jonathanbloch100@gmail.com</a>.</p>
        <p>Find more of my projects on <a href="https://github.com/jbloch100">GitHub</a>.</p>
      </footer>
    </div> 
  ); 

} export default App;