import { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api.js";
import CurrentWeather from "./components/current-weather/CurrentWeather.jsx";
import Search from "./components/search/Search.jsx";
import Forecast from "./components/forecast/Forecast.jsx";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (responses) => {
        const weatherResponse = await responses[0].json();
        const forecastResponse = await responses[1].json();

        setCurrentWeather({ ...weatherResponse, city: searchData.label });
        setForecast({ ...forecastResponse, city: searchData.label });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}
export default App;
