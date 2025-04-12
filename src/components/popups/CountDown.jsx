import { useState, useEffect } from "react";

const CountdownTimer = ({endTime}) => {
    const targetDate = new Date(endTime).getTime();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="countdown-container">
            <div className="countdown">
                {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="time-box">
                        <span className="time-value">{value}</span>
                        <span className="time-label">{unit}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountdownTimer;
