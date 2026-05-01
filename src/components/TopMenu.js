import React, { useEffect, useState } from 'react';

function TopMenu() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="d-flex justify-content-end p-3 border-bottom">
      <div>
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default TopMenu;
