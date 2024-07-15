import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from "react-icons/fa";
import { getAllUsersProfile } from '../../../components/utils/ApiFunctions'; // Adjust the import according to your project structure

function TopContainerAgent() {
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
          <img src={userProfile.posterUrl} alt="User profile" />
        </div>
        <p className="profileName"><span>{userProfile.email}</span></p>
      </div>
    </div>
  );
}

export default TopContainerAgent;