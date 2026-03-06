import React from "react";
import './style.scss'
interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const difference = new Date().getTime() - new Date(targetDate).getTime();
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));

  return (
    <div className="countDown">
      함께한 지 {days}일
    </div>
  );
};

export default Countdown;
