import React, { useState, useEffect, useRef } from "react";

const APP_ID = import.meta.env.VITE_openweathermap_appid;

export default function CitySearch({ onSelect }) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // ปิด dropdown เมื่อคลิกนอก component
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchCity = async (text) => {
    if (text.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${text}&country=TH&limit=10&appid=${APP_ID}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // debounce 400ms
  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setShowDropdown(true);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      searchCity(value);
    }, 400);
  };

  const handleSelect = (item) => {
    setKeyword(item.name);
    setShowDropdown(false);
    setSuggestions([]);

    // ส่งข้อมูลกลับไป parent
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "300px" }}>
      <input
        type="text"
        value={keyword}
        onChange={handleChange}
        placeholder="Search city..."
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        onFocus={() => setShowDropdown(true)}
      />

      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            position: "absolute",
            right: "10px",
            top: "12px",
            width: "16px",
            height: "16px",
            border: "2px solid #ccc",
            borderTop: "2px solid #333",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        ></div>
      )}

      {/* Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "45px",
            width: "100%",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: "220px",
            overflowY: "auto",
            zIndex: 99,
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              style={{
                padding: "10px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.target.style.background = "#fff")}
            >
              {item.name}, {item.country}
              <br />
              <small style={{ color: "#555" }}>
                lat: {item.lat}, lon: {item.lon}
              </small>
            </li>
          ))}
        </ul>
      )}

      {/* ถ้าไม่พบข้อมูล */}
      {showDropdown &&
        keyword.length >= 2 &&
        suggestions.length === 0 &&
        !loading && (
          <div
            style={{
              position: "absolute",
              top: "45px",
              width: "100%",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              zIndex: 99,
            }}
          >
            ไม่พบข้อมูล
          </div>
        )}
    </div>
  );
}
