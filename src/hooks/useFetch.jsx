import React, { useState, useEffect } from "react";
// import axios from "axios";

export default function UseFetch(url) {

  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!url) return;
    
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data_format = await res.json();

        setWeather(data_format);
      } catch (error) {
        setError("Error Fecth", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [url]);

  return {weather, loading, error};
}
