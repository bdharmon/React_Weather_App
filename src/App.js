import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Nav from "./components/Nav";
import cityList from "./data/sortedCities.json";
import "./styles.css";

export default function App() {
  const [searchEntry, setSearchEntry] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("imperial");
  const [weatherData, setWeatherData] = useState({
    id: null,
    name: null,
    humidity: null,
    temp: null,
    time: null,
    timeZone: null,
    weatherID: null,
    weatherMain: null,
    weatherDescription: null,
    windSpeed: null
  });

  // Search field text
  const searchHandler = (e) => {
    setSearchEntry(e.target.value);
  };

  // Unit Measurement Handler
  const unitMeasureHandler = (e, unit) => {
    if (unit === unitMeasure) {
      return null;
    }
    else {
      setUnitMeasure(unit);
    }
  };

  // Fetch weather
  const fetchData = async (e, cityID) => {
    e.preventDefault();
    setSearchEntry("");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?id=${cityID}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${unitMeasure}`
    );

    const data = await response.json();

    const testData = { ...weatherData };
    testData.id = data.id;
    testData.name = data.name;
    testData.humidity = data.main.humidity;
    testData.temp = data.main.temp;
    testData.time = data.dt;
    testData.timeZone = data.timezone;
    testData.weatherID = data.weather[0].id;
    testData.weatherMain = data.weather[0].main;
    testData.weatherDescription = data.weather[0].description;
    testData.windSpeed = data.wind.speed;

    setWeatherData(testData);
  };

  // Search Filter (Binary Search)
  const filteredData = () => {
    let left = 0;
    let right = cityList.length - 1;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (cityList[mid].name === searchEntry) {
        return (
          <li onClick={(e) => fetchData(e, cityList[mid].id)}>
            <span>{cityList[mid].name}, {cityList[mid].country}</span>
            <span className="filtered-id">iD: {cityList[mid].id}</span>
          </li>);
      }
      else if (searchEntry < cityList[mid].name) {
        right = mid - 1;
      }
      else {
        left = mid + 1;
      }
    }
    return null;
  };

  const runFilter = filteredData();

  // Set style for search bar on app load
  let searchStyle;
  if (weatherData.name === null) {
    searchStyle = "only-search";
  }
  else {
    searchStyle = "main";
  }

  return (
    <div className="App">
      <Nav unitMeasureHandler={unitMeasureHandler} unitMeasure={unitMeasure} />
      <main className={searchStyle}>
        <SearchBar searchEntry={searchEntry} searchHandler={searchHandler} filteredData={runFilter} />

        {weatherData.name === null ? null : (
          <CurrentWeather weatherData={weatherData} unitMeasure={unitMeasure} />
        )}
      </main>
    </div>
  );
}
