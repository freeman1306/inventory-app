import React, { useEffect, useState } from 'react';
import socketService from '../services/socketService';

function TopMenu() {
  const [dateTime, setDateTime] = useState(new Date());
  const [activeSessions, setActiveSessions] = useState(0);

  // часы
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // сокет
  useEffect(() => {
    socketService.connect();

    socketService.onSessionCount((count) => {
      setActiveSessions(count);
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  const formattedDate = dateTime.toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
      <div className="text-secondary small">
        Активных сессий: <span className="fw-bold text-dark">{activeSessions}</span>
      </div>
      <div className="text-end">
        <div className="fw-semibold">{formattedDate}</div>
        <div className="small text-secondary">{formattedTime}</div>
      </div>
    </div>
  );
}

export default TopMenu;
