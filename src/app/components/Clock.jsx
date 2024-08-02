"use client";
import React from "react";
import { useState, useEffect } from "react";
function Clock() {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        setSecondsElapsed((prevSeconds) => prevSeconds + 1);
      }, 1000);
  
      // Cleanup interval on component unmount
      return () => clearInterval(timer);
    }, []);
  
    const formatTime = (totalSeconds) => {
      const minutes = Math.floor(totalSeconds / 60)
        .toString()
        .padStart(2, "0");
      const seconds = (totalSeconds % 60).toString().padStart(2, "0");
      return `${minutes}:${seconds}`;
    };
  
    return (
      <div className="text-black bg-white mx-4 m-2">
        <h2 className="bg-slate-500 p-2 rounded-lg font-bold text-white">
          Time: {formatTime(secondsElapsed)}
        </h2>
      </div>
    );
  }

  export default Clock