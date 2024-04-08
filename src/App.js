import React, {useState, useEffect} from 'react'; 
import WeatherInfo from './components/WeatherInfo'; 
import PlacesInfo from './components/PlacesInfo'; 
import MapComponent from './components/MapComponent'; 
import logo from './logo.svg';
import './App.css'; 

function App() { 
  // State for coordinates 
  const [coordinates, setCoordinates] = useState({ lat:51.5074, lon: -0.1278}); 


  const [location, setLocation] = useState({ city:'', country:'' }); 

  const handleLocationChange = async (newCity, newCountry) => {
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(newCity)}&country=${encodeURIComponent(newCountry)}&format=json`;

    try {
      const response = await fetch(nominatimUrl);
      const data = await response.json();
      if(data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates({ lat: parseFloat(lat), lon: parseFloat(lon) });
      } else {
        // Handle no result scenario
        console.log('No location found');
      }
    } catch (error) {
      console.error('Failed to fetch coordinates:', error);
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