import React, { useEffect, useState} from 'react';
import './PlacesInfo.css';


const PlacesInfo = ({ coordinates }) => { 
	const [places, setPlaces] = useState([]);

	useEffect(() => {
	const fetchPlaces = async () => {
		const query = `[out:json]; ( node[leisure=park](around:20000,${coordinates.lat},${coordinates.lon});
		);
		out;`;
		const overpassApiUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
		try {
			const response = await fetch(overpassApiUrl);
			const data = await response.json();
			const places = data.elements;
			const uniquePlaces = Array.from(new Set(places.map(p => p.tags.name)))
				.map(name => {return places.find(p => p.tags.name === name)});
			setPlaces(uniquePlaces);	// Overpass API response contains an `elements` array with the data
			} catch (error) {
			console.error('Error fetching places:', error)
			}
		};

		if(coordinates.lat && coordinates.lon) 
		{
			fetchPlaces();
		}

	}, [coordinates.lat, coordinates.lon]); // Only re-run the effect if coordinates change

	return (
		<div className="places-of-interest">
			<h2>Places Of Interest</h2>
			<ul className="places-list">
				{places.length > 0 ? (
					places.map((place, index) => (
						<li key={index}>
							<div>
								<strong>{place.tags.name}</strong>
							 </div>
						</li>
					))
				) : (
				  		<li>No places available</li>
				)}
			</ul>

		</div>
	);
}; 

export default PlacesInfo;