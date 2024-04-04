import React from 'react';
import './PlacesInfo.css';
import {FaTree, FaMonument} from 'react-icons/fa'

const PlacesInfo = ({ places }) => { 
	// If places are empty or not provided, a default message or list is set
	if(!places || places.length === 0) {
		places = [{ name: "No places available", type: ""}];
	}

	return ( 
		<div className="places-of-interest"> 
			<h2 className="places-title">Places of Interest</h2> 
			<ul className="places-list"> 
				{places.map((place, index) => ( 
					<li key={index}>
						{place.name} {place.type && `(${place.type})`}
					</li> 
					))} 
			</ul> 
		</div> 
	); 
}; 

export default PlacesInfo;