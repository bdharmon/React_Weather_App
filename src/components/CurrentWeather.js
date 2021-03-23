import "../styles.css";
import atmosphere from "../weatherIcons/atmosphere.svg";
import clear from "../weatherIcons/clear.svg";
import cloudy from "../weatherIcons/cloudy.svg";
import drizzle from "../weatherIcons/drizzle.svg";
import rain from "../weatherIcons/rain.svg";
import snow from "../weatherIcons/snow.svg";
import thunderstorm from "../weatherIcons/thunderstorm.svg";

export default function CurrentWeather({ weatherData }) {

  const range = (start, end, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i);

  const weatherCodes = {
    thunderstorm: range(200, 232),
    drizzle: range(300, 321),
    rain: range(500, 531),
    snow: range(600, 622),
    atmosphere: range(701, 781),
    clear: [800],
    cloudy: range(801, 804)
  };

  // Loop through weatherCodes object to retrieve matching weather code
  const getWeatherCode = () => {
    let result = null;
    for (let key in weatherCodes) {
      let obj = weatherCodes[key];
      for (let index = 0; index < obj.length; index++) {
        if (obj[index] === weatherData.weatherID) {
          result = key;
          return result;
        }
      }
    }
  };

  const weatherIcon = getWeatherCode();
  let icon;

  switch (weatherIcon) {
    case "thunderstorm":
      icon = thunderstorm;
      break;

    case "drizzle":
      icon = drizzle;
      break;

    case "rain":
      icon = rain;
      break;

    case "snow":
      icon = snow;
      break;

    case "atmosphere":
      icon = atmosphere;
      break;

    case "clear":
      icon = clear;
      break;

    case "cloudy":
      icon = cloudy;
      break;

    default:
      break;
  }

  // Unix UTC time conversion
  const unixTimestamp = weatherData.time;
  const milliseconds = (unixTimestamp * 1000) + (weatherData.timeZone * 1000);
  const dateObject = new Date(milliseconds);
  const formatDate = dateObject.toUTCString();

  return (
    <div className="weather-card">
      <div className="weather-left">
        <div id="city-name">
          <i className="fas fa-city"></i>
          <h5>{weatherData.name}</h5>
        </div>

        <img className="weather-img" src={icon} alt="" />

        <div id="temp">
          <i className="fas fa-thermometer-full"></i>
          <h5>{Math.floor(weatherData.temp)} &#778;</h5>
        </div>

        <div id="weather-sky"><h5>{weatherData.weatherMain}</h5></div>
      </div>

      <div className="weather-right">
        <div>
          <i className="far fa-clock"></i>
          <h4>{formatDate}</h4>
        </div>

        <div>
          <i className="fas fa-wind"></i>
          <h5>Wind Speed</h5>
          {weatherData.windSpeed}
        </div>

        <div>
          <h5>Humidity</h5>
          {weatherData.humidity}%
        </div>
      </div>
    </div>
  );
}
