import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const Horloge: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-4xl font-bold">
      {format(time, 'HH:mm:ss')}
    </div>
  );
}

export default Horloge;
