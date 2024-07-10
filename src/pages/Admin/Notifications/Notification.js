import React from 'react';
import styles from './Notification.module.css';

const Notification = ({ notification, onDisable }) => {
  return (
    <div className={styles.notificationContainer}>
      <p className={styles.notificationMessage}>{notification.message}</p>
      {notification.isActive ? (
        <button className={styles.disableButton} onClick={() => onDisable(notification.id)}>
          Désactiver
        </button>
      ) : (
        <span className={styles.disabledText}>Désactivé</span>
      )}
    </div>
  );
};

export default Notification;
