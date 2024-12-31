import React, { useEffect, useState, useRef } from "react";
import { Fireworks } from "fireworks-js";

const CountDown = ({ newYear }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [finished, setFinished] = useState(false);
  const fireworksContainer = useRef(null);

  const getNigeriaTime = (timestamp) => {
    const nigeriaDate = new Date(timestamp).toLocaleString("en-US", {
      timeZone: "Africa/Lagos",
    });
    return new Date(nigeriaDate).getTime();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
        const now = getNigeriaTime(new Date().getTime());
        const distance = (newYear - now) / 1000;
      if (distance > 0) {
        const days = Math.floor(distance / 60 / 60 / 24);
        const hours = Math.floor((distance / 60 / 60) % 24);
        const mins = Math.floor((distance / 60) % 60);
        const secs = Math.floor(distance % 60);
        setDays(days);
        setHours(hours);
        setMins(mins);
        setSecs(secs);
      } else {
        clearInterval(timerId);
        setFinished(true);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [newYear]);

//   Fireworks

useEffect(() => {
    if (finished && fireworksContainer.current) {
      const fireworks = new Fireworks(fireworksContainer.current, {
        autoresize: true,
        opacity: 0.5,
        acceleration: 1.05,
      });

      fireworks.start();

      
      const audio = new Audio("/assets/fireworks.mp3"); 
      audio.play();

      
      setTimeout(() => {
        fireworks.stop();
      }, 10000);
    }
  }, [finished]);

  if (finished) {
    return (
      <div className="flex w-[40rem] flex-col justify-center text-center">
        <h3 className="text-center text-4xl mb-4 font-bold text-green-200">
          🎉 Happy New Year! 🎉
        </h3>
        <p className="  text-white text-sm ">
          Wishing you a year filled with joy and endless opportunities. May 2025
          bring you closer to your dreams and surround you with love and
          success.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-5">
        <div className="countdown">
          <div className="time">
            <div className="bg-white px-10 py-8 text-2xl">{days}</div>
            <p className="bg-yellow-500 text-center font-semibold p-2">Day</p>
          </div>
        </div>
        <div className="countdown">
          <div className="time">
            <div className="bg-white px-10 py-8 text-2xl">{hours}</div>
            <p className="bg-yellow-500 text-center font-semibold p-2">Hour</p>
          </div>
        </div>
        <div className="countdown">
          <div className="time">
            <div className="bg-white px-10 py-8 text-2xl">{mins}</div>
            <p className="bg-yellow-500 text-center font-semibold p-2">
              Minutes
            </p>
          </div>
        </div>
        <div className="countdown">
          <div className="time">
            <div className="bg-white px-10 py-8 text-2xl">{secs}</div>
            <p className="bg-yellow-500 text-center font-semibold p-2">
              Second
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountDown;
