import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

const Chronometre: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl font-bold">{formatTime(time)}</div>
      <div className="flex space-x-2">
        <Button onClick={startStop}>
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={reset} disabled={isRunning}>
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Chronometre;
