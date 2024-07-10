
import React, { useEffect, useState } from 'react';
import "./index.css";
import { Link } from 'react-router-dom';
import { PButton } from '../../components/_tools/_tools';
import { getAllUsersProfile } from '../../components/utils/ApiFunctions';
import { useAuth } from '../../components/Auth/AuthProvider';
import { FaPen,FaHeart } from 'react-icons/fa';

const Profil = () => {
  const [userProfile, setUserProfile] = useState(null);
  const {auth , handleLogOut} = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getAllUsersProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const deconnexion = () => {
    // Implement deconnexion logic
  };

  const modifier = () => {
    // Implement modifier logic
  };

  const changer = () => {
    // Implement changer logic
  };

  return (
    <div className='profilU'>
      {userProfile ? (
        <>
              <div className="userp-img">
                <img src={userProfile.posterUrl} alt={userProfile.name} className="user-image" />
                <button changer={changer}><FaPen/></button>
              </div>
          <div className='info-container'>
            <p>{userProfile.name}</p>
            <p>{userProfile.role}</p>
            <p>{userProfile.telephone}</p>
            <p>{userProfile.email}</p>
          
          </div>
          <div className='profileBtns'>
          <button onClick={handleLogOut} >deconnecion </button>
          <Link to='/UserProfile'>
              <button modifier={modifier}> modifier </button>
            </Link>
          </div>
          <Link to='/Favoris' className="favoriLink">Favoris <FaHeart className="favori" /></Link>
            
        </>
      ) : (
        <p>Loading...</p>
      )}

          
            
    </div>
  );
};

export default Profil;
