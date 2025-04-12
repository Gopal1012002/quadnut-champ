import React, { useState } from "react";

function MinimalistRangeSlider() {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "minPrice") {
      setMinPrice(Math.min(Number(value), maxPrice - 1)); // Ensure min < max
    } else {
      setMaxPrice(Math.max(Number(value), minPrice + 1)); // Ensure max > min
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      {/* Range Slider */}
      <div style={{ position: "relative", height: "30px" }}>
        {/* Green Pipe (Track between the thumbs) */}
        <div
          style={{
            position: "absolute",
            height: "5px",
            background: "#28a745",
            zIndex: 1,
            top: "12px",
            left: `${(minPrice / 20000) * 100}%`,
            right: `${100 - (maxPrice / 20000) * 100}%`,
            borderRadius: "5px",
          }}
        ></div>

        {/* Min Price Slider */}
        <input
          type="range"
          min="0"
          max="20000"
          step="100"
          value={minPrice}
          name="minPrice"
          onChange={handleChange}
          style={{
            position: "absolute",
            width: "100%",
            appearance: "none",
            height: "0px",
            background: "transparent",
            zIndex: 2,
          }}
        />

        {/* Max Price Slider */}
        <input
          type="range"
          min="0"
          max="20000"
          step="100"
          value={maxPrice}
          name="maxPrice"
          onChange={handleChange}
          style={{
            position: "absolute",
            width: "100%",
            appearance: "none",
            height: "0px",
            background: "transparent",
            zIndex: 2,
          }}
        />
      </div>

      {/* Selected Price Range */}
      <div style={{ textAlign: "center", marginTop: "20px", fontSize: "1em", fontWeight: "bold" }}>
        Price Range: ₹{minPrice} - ₹{maxPrice}
      </div>

      {/* Styling */}
      <style>
        {`
          /* Hidden Base Track */
          input[type="range"] {
            outline: none;
          }

          /* Invisible Track */
          input[type="range"]::-webkit-slider-runnable-track {
            height: 0px;
          }
          input[type="range"]::-moz-range-track {
            height: 0px;
          }

          /* Thumb (Circular Handles) */
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #28a745;
            border-radius: 50%;
            border: 2px solid #fff;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #28a745;
            border-radius: 50%;
            border: 2px solid #fff;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
          }
        `}
      </style>
    </div>
  );
}

export default MinimalistRangeSlider;
