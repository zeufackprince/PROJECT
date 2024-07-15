import React, { useState, useEffect } from 'react';
import './NotificationsAdmin.css';
import { getAllNotificationAdmin } from '../../../components/utils/ApiFunctions';  // Assurez-vous que le chemin est correct

const profile = process.env.PUBLIC_URL + '/images/images.png';

function Main() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const result = await getAllNotificationAdmin();
        setNotifications(result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false); // Arrêter le chargement une fois les données récupérées
      }
    };

    fetchNotifications();
  }, []);

  const handleToggleNotification = (id) => {
    setNotifications(
      notifications.map(notification =>
        notification.notif_id === id ? { ...notification, isActive: !notification.isActive } : notification
      )
    );
  };

  if (loading) {
    return <div className="container">Chargement...</div>;
  }

  return (
    <div className="container">
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification disponible</p>
      ) : (
        notifications.map(notification => (
          
          <div key={notification.notif_id} className="notification-item">
            <div className="notif-image">
                <img src={notification.posterUrl || profile} alt="photo de profile" /> {/* Use a default image if posterUrl is not available */}
                <div className="notification-message">{notification.not_message}</div>
            </div>
            
            <button
              className={`notification-button ${!notification.isActive ? 'disabled' : ''}`}
              onClick={() => handleToggleNotification(notification.notif_id)}
            >
              {notification.isActive ? 'Désactiver' : 'Réactiver'}
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Main;
