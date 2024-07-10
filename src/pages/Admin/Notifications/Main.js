import React, { useState } from 'react';
import './Main.css'

function Main() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Notification 1", isActive: true },
    { id: 2, message: "Notification 2", isActive: true },
    { id: 3, message: "Notification 3", isActive: true },
    { id: 4, message: "Notification 4", isActive: true },
    { id: 5, message: "Notification 5", isActive: true },
    { id: 6, message: "Notification 6", isActive: true },
    { id: 7, message: "Notification 7", isActive: true },
    { id: 8, message: "Notification 8", isActive: true },
    { id: 9, message: "Notification 9", isActive: true },
    { id: 10, message: "Notification 10", isActive: true }
  ]);

  const handleToggleNotification = (id) => {
    setNotifications(
      notifications.map(notification =>
        notification.id === id ? { ...notification, isActive: !notification.isActive } : notification
      )
    );
  };

  return (
    <div className="container">
      <h1>Notifications</h1>
      {notifications.map(notification => (
        <div key={notification.id} className="notification-item">
          <div className="notification-message">{notification.message}</div>
          <button
            className={`notification-button ${!notification.isActive ? 'disabled' : ''}`}
            onClick={() => handleToggleNotification(notification.id)}
          >
            {notification.isActive ? 'Désactiver' : 'Réactiver'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Main;