import React, { useEffect } from 'react'; 
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import './MapComponent.css';

// Import marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Create a new default icon
const defaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],	// size of the icon
	iconAnchor: [12, 41], // point of the icon which will correspond to the marker's location
	popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
	shadowSize: [41, 41]	// size of the shadow
});

// Set the default icon for all Leaflet markers
L.Marker.prototype.options.icon = defaultIcon;  

const MapComponent = ({ coordinates }) => 
{ 
	useEffect(() => {
		// Initialize the map
		const map = L.map('map').setView([coordinates.lat, coordinates.lon], 13);

		// Add OpenStreetMap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; OpenStreetMap contributors'
		}).addTo(map);

		
		//Add a marker for the location
		L.marker([coordinates.lat, coordinates.lon]).addTo(map);

		// Clean up the map on unmount
		return () => map.remove();
	}, [coordinates.lat, coordinates.lon]); // Only re-run the effect if coordinates change

	return <div id="map"></div>;
}; 

export default MapComponent;