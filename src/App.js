import React, {useState, useEffect} from 'react'; 
import WeatherInfo from './components/WeatherInfo'; 
import PlacesInfo from './components/PlacesInfo'; 
import MapComponent from './components/MapComponent'; 
import './App.css'; 

function App() { 
  // State for coordinates 
  const [coordinates, setCoordinates] = useState({ lat: 40.7128, lon: -74.0060 }); 

  // State for places - initially empty array 
  const [places, setPlaces] = useState([]); 

  useEffect(() => { 
    // Define the query 
    const query = ` [out:json]; ( node["leisure"="park"](around:5000,${coordinates.lat},${coordinates.lon}); 
    ); 
    out;`; 

    // Function to fetch places data 
    const fetchPlacesData = async () => { 
      try { 
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`; 
        const response = await fetch(overpassUrl); 
        const data = await response.json(); 

        // Transform the data into the format expected by PlacesInfo 
        const placesData = data.elements.map((element) => { 
          return { name: element.tags.name || 'Unnamed', type: 'Park' 
          }; 
        }); 

        setPlaces(placesData); 
        } catch (error) { 
        console.error('Failed to fetch places from OSM:', error); 
        } 
      }; 

      fetchPlacesData(); 
    }, [coordinates.lat, coordinates.lon]); // Fetch new places if coordinates change 

  return ( 
    <div className="App"> 
      <WeatherInfo lat={coordinates.lat} lon={coordinates.lon} /> 
      <MapComponent lat={coordinates.lat} lon={coordinates.lon} /> 
      <PlacesInfo places={places} /> 
    </div> 
  ); 

} export default App;