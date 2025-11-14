import { useState } from "react";
import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const APP_ID = import.meta.env.VITE_openweathermap_appid;
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const fecthWeather = async () => {
      try {
        const res = await axios.get(
         `https://api.openweathermap.org/data/2.5/weather?q=Bangkok&appid=${APP_ID}`
        );
        const data_format = await res.data;
        console.log(`ข้อมูลสภาพอากาศ ${JSON.stringify(data_format, null, 2)}`);
        setWeather(data_format);
      } catch (error) {
        console.log("Error Fecth", error);
      }
    };
    fecthWeather();
  }, []);
  if (!weather) {
    return <div> Loading...</div>;
  }
  return (
    <>
      <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1
                  id="dashboard-title"
                  className="text-4xl font-bold text-white mb-2"
                >
                  Dashboard ของฉัน
                </h1>
                <p
                  id="welcome-message"
                  className="text-xl text-white opacity-90"
                >
                  สวัสดีตอนเช้า! 👋
                </p>
              </div>
              <div className="text-right">
                <div
                  id="current-time"
                  className="text-3xl font-bold text-white"
                ></div>
                <div
                  id="current-date"
                  className="text-sm text-white opacity-90"
                ></div>
              </div>
            </div>
          </header>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="card stat-card bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
              <div className="flex flex-col items-center">
                <div id="weather-icon" className="weather-icon mb-2">
                  ☁️
                </div>
                <div id="temperature" className="text-3xl font-bold mb-1">
                  31°C
                </div>
                <div id="city-name" className="text-sm opacity-90">
                  Bangkok
                </div>
              </div>
            </div>
            <div className="card stat-card bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">💨 ความเร็วลม</div>
              <div id="wind-speed" className="text-4xl font-bold mb-1">
                {weather.wind?.speed}
              </div>
              <div className="text-xs opacity-75">m/s</div>
            </div>
            <div className="card stat-card bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">💧 ความชื้น</div>
              <div id="humidity" className="text-4xl font-bold mb-1">
                {weather.main?.humidity}
              </div>
              <div className="text-xs opacity-75">%</div>
            </div>
            <div className="card stat-card bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">🌡️ รู้สึกเหมือน</div>
              <div id="feels-like" className="text-4xl font-bold mb-1">
                38
              </div>
              <div className="text-xs opacity-75">°C</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <div id="weather-icon-large" className="text-8xl mb-4">
                  ☁️
                </div>
                <div
                  id="temperature-large"
                  className="text-6xl font-bold text-gray-800 mb-2"
                >
                  31°C
                </div>
                <div
                  id="city-name-large"
                  className="text-2xl font-semibold text-gray-600 mb-2"
                >
                  Bangkok
                </div>
                <div
                  id="description-large"
                  className="text-lg text-gray-500 capitalize"
                >
                  เมฆมาก
                </div>
              </div>
            </div>
            <div className="card bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                รายละเอียด
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">💨</span>{" "}
                    <span className="text-gray-700 font-medium">
                      ความเร็วลม
                    </span>
                  </div>
                  <span
                    id="wind-speed-large"
                    className="text-xl font-bold text-gray-800"
                  >
                    1.18 m/s
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">💧</span>{" "}
                    <span className="text-gray-700 font-medium">ความชื้น</span>
                  </div>
                  <span
                    id="humidity-large"
                    className="text-xl font-bold text-gray-800"
                  >
                    76%
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🌡️</span>{" "}
                    <span className="text-gray-700 font-medium">
                      รู้สึกเหมือน
                    </span>
                  </div>
                  <span
                    id="feels-like-large"
                    className="text-xl font-bold text-gray-800"
                  >
                    38°C
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">☁️</span>{" "}
                    <span className="text-gray-700 font-medium">สภาพอากาศ</span>
                  </div>
                  <span
                    id="description-detail"
                    className="text-xl font-bold text-gray-800 capitalize"
                  >
                    เมฆมาก
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
