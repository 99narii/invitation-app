import React, { useState, useEffect } from "react";
import './style.scss'
interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();

    let timeRemaining = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    setTimeLeft(timeRemaining);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      calculateTimeLeft();
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countDown">
      {timeLeft.days} Days
      {timeLeft.hours}:
      {timeLeft.minutes}:
      {timeLeft.seconds}
    </div>
  );
};

export default Countdown;
