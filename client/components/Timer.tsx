import React, { useEffect, useState } from "react";
import { FC } from "react";
import "../css/style2.css";

React.version
const Timer: FC = () => {

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [daysStr, setDaysStr] = useState("дней");
  const [hoursStr, setHoursStr] = useState("часов");
  const [minutesStr, setMinutesStr] = useState("минут");
  const [secondsStr, setSecondsStr] = useState("секунд");

  const calculateTimeLeft = (): void => {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1);
    const timeDiff = nextYear.getTime() - now.getTime();

    if (timeDiff <= 0) {
      setDays(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000);

    setDays(daysLeft);
    setHours(hoursLeft);
    setMinutes(minutesLeft);
    setSeconds(secondsLeft);

    padeszOfTime(daysLeft, hoursLeft, minutesLeft, secondsLeft);

  };

  const padeszOfTime = (days: number, hours: number, minutes: number, seconds: number): void => {
    const getLastDigit = (num: number): number => Math.abs(num % 10);
    const lastDayDigit = getLastDigit(days);
    if (days < 10 || days > 20 || days < 110 || days > 120 || days < 210 || days > 220 || days < 310 || days > 320) {
      switch (lastDayDigit) {
        case 1:
          setDaysStr("день");
          break;
        case 2:
        case 3:
        case 4:
          setDaysStr("дня");
          break;
        default:
          setDaysStr("дней");
          break;
      }
    } else {
      setDaysStr('дней')
    }
    const lastHourDigit = getLastDigit(hours);
    if (hours < 10 || hours > 20) {
      switch (lastHourDigit) {
        case 1:
          setHoursStr("час");
          break;
        case 2:
        case 3:
        case 4:
          setHoursStr("часа");
          break;
        default:
          setHoursStr("часов");
          break;
      }
    } else {
      setHoursStr('часов')
    }
    const lastMinuteDigit = getLastDigit(minutes);
    if (minutes < 10 || minutes > 20) {

      switch (lastMinuteDigit) {
        case 1:
          setMinutesStr("минута");
          break;
        case 2:
        case 3:
        case 4:
          setMinutesStr("минуты");
          break;
        default:
          setMinutesStr("минут");
          break;
      }
    } else {
      setMinutesStr('минут')
    }
    const lastSecondDigit = getLastDigit(seconds);
    if (seconds < 10 || seconds > 20) {

      switch (lastSecondDigit) {
        case 1:
          setSecondsStr("секунда");
          break;
        case 2:
        case 3:
        case 4:
          setSecondsStr("секунды");
          break;
        default:
          setSecondsStr("секунд");
          break;
      }
    } else {
      setSecondsStr('секунд')
    }

  };

  useEffect(() => {
    calculateTimeLeft();

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
        <div id="timer">
          <div className="block" id="day">
            <span className="number">{days}</span>
            <span className="nameDate">{daysStr}</span>
          </div>
          <div className="block" id="hour">
            <span className="number">{hours}</span>
            <span className="nameDate">{hoursStr}</span>
          </div>
          <div className="block" id="minute">
            <span className="number">{minutes}</span>
            <span className="nameDate">{minutesStr}</span>
          </div>
          <div className="block" id="secund">
            <span className="number">{seconds}</span>
            <span className="nameDate">{secondsStr}</span>
          </div>
        </div>
    </>
  );
};

export default Timer;