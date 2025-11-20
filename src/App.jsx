import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import WeatherFeed from "./components/weatherFeed";
import UseFetch from "./hooks/useFetch";

function App() {
  //  `https://api.openweathermap.org/data/2.5/weather?q=Bangkok&units=metric&appid=${APP_ID}`

  const [time, setTime] = useState(new Date());

  const APP_ID = import.meta.env.VITE_openweathermap_appid;

  const { weather, loading, error } = UseFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Bangkok&units=metric&appid=${APP_ID}`
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <WeatherFeed time={time} weather={weather} />
    </>
  );
}

export default App;
