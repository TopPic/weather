import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import WeatherFeed from "./components/weatherFeed";

function App() {
  const APP_ID = import.meta.env.VITE_openweathermap_appid;
  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Bangkok&units=metric&appid=${APP_ID}`
        );
        const data_format = await res.data;
        // console.log(`ข้อมูลสภาพอากาศ ${JSON.stringify(data_format, null, 2)}`);
        setWeather(data_format);
      } catch (error) {
        console.log("Error Fecth", error);
      }
    };
    fetchWeather();
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (!weather) {
    return <div> Loading...</div>;
  }

  return (
    <>
      <WeatherFeed time={time} weather={weather} />
    </>
  );
}

export default App;
