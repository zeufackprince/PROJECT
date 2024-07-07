import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaChevronDown } from "react-icons/fa";
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

    const menuTarget = document.getElementById("chevron");
    const menuContainer = document.getElementById("menu-Container");

    menuTarget.addEventListener("mouseenter", () => {
      menuTarget.style.transform = 'rotate(180deg)';
      menuContainer.style.transform = 'translateX(0px)';
    });

    menuContainer.addEventListener("mouseleave", () => {
      menuTarget.style.transform = 'rotate(0deg)';
      menuContainer.style.transform = 'translateX(250px)';
    });

    // Cleanup event listeners
    return () => {
      menuTarget.removeEventListener("mouseenter", () => {
        menuTarget.style.transform = 'rotate(180deg)';
        menuContainer.style.transform = 'translateX(0px)';
      });
      menuContainer.removeEventListener("mouseleave", () => {
        menuTarget.style.transform = 'rotate(0deg)';
        menuContainer.style.transform = 'translateX(250px)';
      });
    };
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
        <i className="menuChevron" id="chevron">
          <FaChevronDown />
        </i>
        <div className="menu-Container" id="menu-Container">
          <ul>
            <li><Link to='/admin/dashboard'>Dashboard</Link></li>
            <li><Link to='/crud-app-logements'>Logements</Link></li>
            <li><Link to=''>Notifications</Link></li>
            <li><Link to=''>Infos</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopContainer;
