import React, { useState, useEffect, useRef } from "react";

function Stopwatch({ className, playerName }) {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  }
  function addLap(){
    setLaps([...laps, formatTime()]);
  }

  function formatTime() {
    // Convert milliseconds to minutes, seconds, and milliseconds
    let minutes = Math.floor(elapsedTime / 60000); 
    let seconds = Math.floor((elapsedTime % 60000) / 1000); 
    let milliseconds = Math.floor((elapsedTime % 1000) / 10); 
  
    // Pad each value with leading zeros if it's less than 10
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
  }
  

  return (
    <div className={`stopwatch ${className}`}>
      <h2>{playerName}</h2> 
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button className="start-button" onClick={start}>Start</button>
        <button className="stop-button" onClick={stop}>Stop</button>
        <button className="reset-button" onClick={reset}>Reset</button>
        <button className="lap-button" onClick={addLap}>Lap</button>
        <ul>
            {laps.map((lap, index) => (
              <li key={index}>Lap {index +1} : {lap}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Stopwatch;
