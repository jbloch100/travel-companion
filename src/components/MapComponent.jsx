import React, { useEffect } from 'react'; 
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 

const MapComponent = ({ lat, lon }) => { 
	useEffect(() => { 
		// Define the container ID for the map 
		const containerId = "map"; 

		// Ensure the container for the map is empty 
		// This prevents "Map container is already initialized" error 
		const container = document.getElementById(containerId); 
		container.innerHTML = "";	// Ensure the container for map is empty 

		// Initialize the map 
		const map = L.map(containerId).setView([lat, lon], 13); 
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map); 

		// Cleanup function to run when the component unmounts 
		return () => map.remove(); 
	 }, [lat, lon]);	// useEffect will re-run when lat or lon changes

	return <div id="map" style={{ height: '400px', width: '100%' }}></div>; 
}; 

export default MapComponent;