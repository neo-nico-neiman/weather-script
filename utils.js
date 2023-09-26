async function fetchData(url) {
	const response = await fetch(url);

	if (response.status !== 200) {
		console.log('Failed to fetch, please try again later');
	}

	const data = await response.json();

	return data;
}

function formatTime(time) {
	return time < 10 ? `0${time}` : time;
}

function getTimeString(dateTimeStamp) {
	const date = new Date();
	date.setTime(dateTimeStamp);

	return [date.getHours(), date.getMinutes()]
		.map((value) => formatTime(value))
		.join(':');
}

function getStringFromOpenWeatherData(data, format) {
	const { weather, name, wind, main, sys } = data;

	if (format === 'short') {
		return `Conditions: ${(weather ?? []).map(
			(condition) => condition.description
		)} - Temp: ${main.temp} °C - Feels like: ${main.feels_like} °C
        `;
	}

	const weatherString = `
	Weather for ${name}: ${(weather ?? []).map(
		(condition) => condition.description
	)}

	Temp: ${main.temp} °C - Feels like: ${main.feels_like} °C
	(min: ${main.temp_min} - max: ${main.temp_max})
	
            
	Wind speed: ${wind.speed} km/h - Humidity: ${main.humidity}%
	Sunrise: ${getTimeString(sys.sunrise)} am - Sunset: ${getTimeString(
		sys.sunset
	)} pm`;

	return weatherString;
}

module.exports = {
	formatTime,
	getTimeString,
	getStringFromOpenWeatherData,
	fetchData,
};
