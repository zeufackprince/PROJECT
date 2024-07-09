import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import { getAllUsersProfile } from '../../../components/utils/ApiFunctions'; // Adjust the import according to your project structure
import './TopContainer.css'; // Add the necessary CSS file if not already added

function TopContainer() {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    posterUrl: ''
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getAllUsersProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className='TopContainer'>
      <div className="container-title">
        <h1 className="main-title">Dashboard</h1>
      </div>

      <div className="profile-box">
        <i className="notif-icon">
          <Link to='/' id=""><FaBell /></Link>     
        </i>
        <div className="profileImage">
          <Link to='/'><img src={userProfile.posterUrl} alt="User profile" width="50px" /></Link>
        </div>
        <p className="profileName"><span>{userProfile.name}</span> {userProfile.email}</p>
      </div>
    </div>
  );
}

export default TopContainer;
