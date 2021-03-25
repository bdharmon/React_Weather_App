import React, { useEffect, useState, useRef } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Nav from "./components/Nav";
import "./styles.css";

export default function App() {
  const [searchEntry, setSearchEntry] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("imperial");
  const [weatherData, setWeatherData] = useState({
    country: null,
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

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      // Your useEffect code here to be run on update
      const fetchData1 = async (city) => {

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${unitMeasure}`
        );

        const data = await response.json();

        const testData = { ...weatherData };
        testData.country = data.sys.country;
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

      fetchData1(weatherData.name);
    }
  }, [unitMeasure]);

  // Search field text
  const searchHandler = (e) => {
    setSearchEntry(e.target.value);
  };

  // Unit Measurement Handler
  const unitMeasureHandler = (unit) => {
    if (unit === unitMeasure) {
      return null;
    }
    else {
      setUnitMeasure(unit);
    }
  };

  // Fetch weather
  const fetchData = async (e, city) => {
    e.preventDefault();
    setSearchEntry("");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=${unitMeasure}`
    );

    const data = await response.json();

    const testData = { ...weatherData };
    testData.country = data.sys.country;
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
        <SearchBar searchEntry={searchEntry} searchHandler={searchHandler} fetchData={fetchData} />

        {weatherData.name === null ? null : (
          <CurrentWeather weatherData={weatherData} unitMeasure={unitMeasure} />
        )}
      </main>
    </div>
  );
}
