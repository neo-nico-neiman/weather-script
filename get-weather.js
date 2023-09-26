require('dotenv').config({ path: '~/Coding/terminal-scripts/weather/.env' });
const utils = require('./utils');

const { getStringFromOpenWeatherData, fetchData } = utils;
const { LAT, LONG, API_KEY_OPEN_WEATHER } = process.env;
const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LONG}&appid=${API_KEY_OPEN_WEATHER}&units=metric`;

async function getWeather() {
	var format = process.argv.slice(2)[0];

	try {
		const data = await fetchData(openWeatherURL);

		console.log(getStringFromOpenWeatherData(data, format));
		return;
	} catch (error) {
		console.log(error);
	}
}

getWeather();
