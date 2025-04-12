import React, { useState, useEffect } from "react";
import '../../assets/css/count-down.css'

const CountdownTimer = ({ targetDate, endDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    return difference > 0 ? Math.floor(difference / 1000) : 0;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, timeLeft]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hrs = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return (
      <div className="countdown-container">
        <div className="countdown-box">
          <span className="count-value">{String(days).padStart(2, "0")}</span>
          <span className="count-label">Days</span>
        </div>
        <div className="countdown-box">
          <span className="count-value">{String(hrs).padStart(2, "0")}</span>
          <span className="count-label">Hours</span>
        </div>
        <div className="countdown-box">
          <span className="count-value">{String(mins).padStart(2, "0")}</span>
          <span className="count-label">Minutes</span>
        </div>
        <div className="countdown-box">
          <span className="count-value">{String(secs).padStart(2, "0")}</span>
          <span className="count-label">Seconds</span>
        </div>
      </div>
    );
  };

  let endTime = new Date(endDate);
  let currentTime = new Date();
  return (
    <div className="countdown-wrapper">
      {currentTime > endTime ?<div className="time-up"> Mock Test Submission Closed </div> : timeLeft > 0 ? formatTime(timeLeft) : <div className="time-up">Mock Test is Live!</div>}
    </div>
  );
};

export default CountdownTimer;
