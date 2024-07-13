import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllNotificationAgent } from '../../../../components/utils/ApiFunctions'; // Adjust the import according to your project structure

const profile = process.env.PUBLIC_URL + '/images/images.png';

function MainRightBottomAg() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await getAllNotificationAgent();
        setNotifications(result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = (notif_id) => {
    setNotifications(notifications.map(notification =>
      notification.notif_id === notif_id ? { ...notification, isRead: true } : notification
    ));
  };

  return (
    <div className='bottomRightCard'>
      <div className="bottomName">       
        <h2>Messages</h2>
        <Link to='/'>View More</Link>
      </div>

      <div className='notifContainer'>
        {
          notifications && notifications.map((notification) => 
          (
            <div className={`notifactions ${notification.isRead ? 'read' : ''}`} key={notification.notif_id}>
              <div className="notif-image">
                <img src={notification.posterUrl || profile} alt="photo de profile" /> {/* Use a default image if posterUrl is not available */}
              </div>
              <p className="notif-name">
                  {notification.publication_name} <span>{notification.not_message}</span>
              </p>
              <p className="notif-time">{new Date(notification.createdAt).toLocaleString()}</p>
              <button onClick={() => handleMarkAsRead(notification.notif_id)} className="button1 btn">Read</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MainRightBottomAg;
