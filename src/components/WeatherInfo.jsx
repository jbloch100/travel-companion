import React, { useState, useEffect } from 'react'; 
import './WeatherInfo.css'; 

const WeatherInfo = ({ onLocationChange }) => { 
	const [city, setCity] = useState(''); 
	const [country, setCountry] = useState(''); 
	const [weatherData, setWeatherData] = useState(null); 
	const [error, setError] = useState('');
	const [countries, setCountries] = useState([]); 

	useEffect(() => {
		fetch('https://restcountries.com/v3.1/all')
		.then(response => response.json())
		.then(data => {
			const countryOptions = data.map(country => ({
				name: country.name.common,
				code: country.cca2
			}))
			.sort((a, b) => a.name.localeCompare(b.name));	// Sort alphabetically by the common name
			setCountries(countryOptions);
		})
		.catch(error => {
			console.error("Error fetching countries:", error);
		});
	}, []);

	const fetchWeatherData = (e) => { 
		e.preventDefault(); // Prevent the form from refreshing the page 
		const apiKey = process.env.REACT_APP_WEATHER_API_KEY; 
		const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`; 

		fetch(url) 
			.then(response => { 
				if (!response.ok) { 
					throw new Error('Invalid location'); // This will handle 404 errors and the like 
				} 
				return response.json(); 
			}) 
			.then(data => { 
				setWeatherData(data);
				setError(''); // Clear any previous errors
				onLocationChange(city, country); 
			}) 

			.catch(error => { 
				console.error("Error fetching weather data:", error); 
				setError('Invalid location'); // Set error message for the user 
				setWeatherData(null); // Reset weather data

			});

		 
	}; 

	return ( 
		<div> 
			<form onSubmit={fetchWeatherData} className="form-group">
				<div className="input-container"> 
					<input type="text"
						   className="input-field" 
						   value={city} 
						   onChange={e =>
						   setCity(e.target.value)} 
						   placeholder="Enter city" 
					/> 

					<select className="input-field"
							value={country}
							onChange={e =>
							setCountry(e.target.value)}>
					
							<option value="">
								Select a country
							</option>

							{countries.map(({ name, code }) => (
								<option key={code} value={code}>{name}</option>
								))}			

					</select> 

					<button type="submit" className="submit-button">Get Weather</button>
				</div> 
			</form> 

			{error && <div className="weather-error">{error}</div>} 

			{weatherData && ( 
				<div className="weather-info"> 
					<h2>{weatherData.name}, {weatherData.sys.country}</h2> 
					<div className="weather-temperature">{weatherData.main.temp}°C</div> 
					<div className="weather-description">{weatherData.weather[0].description}</div> 
					<div className="weather-details"> 
						<div className="detail-item"> 
							<h4>Wind</h4> 
							<p>{weatherData.wind.speed} m/s</p> 
						</div> 
						<div className="detail-item"> 
							<h4>Humidity</h4> 
							<p>{weatherData.main.humidity}%</p> 
						</div> 
						<div className="detail-item"> 
							<h4>Pressure</h4> 
							<p>{weatherData.main.pressure} hPa</p> 
						</div> 
					</div> 
				</div> 
				)
			}

		</div> 
	); 
}; export default WeatherInfo;