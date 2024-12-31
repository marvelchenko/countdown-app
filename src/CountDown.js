import React, { useEffect, useState, useRef } from "react";
import { Fireworks } from "fireworks-js";
import audioFile from '../src/assets/fireworks.mp3';


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
      if (distance <= 0) {
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

      
      const audio = new Audio(audioFile); 
      audio.play()
        .catch(error => {
          console.error('Audio playback failed:', error);
    
        });
      
      setTimeout(() => {
        fireworks.stop();
      }, 10000);
    }
  }, [finished]);

  
  if (finished) {
    return (
      <div ref={fireworksContainer} className="relative w-full h-screen">
        <h3 className="absolute inset-0 flex items-center justify-center text-center text-4xl font-bold text-green-200 z-10">
          🎉 Happy New Year! 🎉
        </h3>
        <p className="absolute bottom-[13rem] w-full text-center text-white text-sm z-10">
          Wishing you a year filled with joy and endless opportunities.
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
