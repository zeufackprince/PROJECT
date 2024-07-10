import React from 'react';
import Notification from './Notification';



const NotificationsList = ({ notifications, onDisable }) => {
  return (
    <div>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          notification={notification}
          onDisable={onDisable}
        />
      ))}
    </div>
  );
};

export default NotificationsList;