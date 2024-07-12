import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './parametreAgent.css';
import { getAllUsersProfile } from '../../../components/utils/ApiFunctions';
import { FaPen } from 'react-icons/fa';

function ParametreAgent() {
    const [profile, setProfile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getAllUsersProfile();
                setProfile(data);
            } catch (error) {
                setErrorMessage(error.message);
            }
        };

        fetchUserProfile();
    }, []);


    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="setting-container">

            <div className="profile-section">
                <h3>ADMIN PROFILE</h3>
                <p className='barre barre-profil'></p>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className='back-color'></div>

                <div className="profile-details">
                    <img src={profile.posterUrl} alt={profile.name} className="profile-image" />

                    <div className="profile-info">
                        <p className='admin-name'>{profile.name}</p>
                        <p className='admin-email'>{profile.email}</p>
                        <p className='admin-role'><strong>Role:</strong> {profile.role}</p>
                        <Link to='/admin/editer-profil' className="edit-profile-button"><FaPen/> Edit Profile</Link>
                    </div>

                </div>
                    <h3>PARAMETRES</h3>
                    <p className='barre'></p>
                <div className="action-buttons">
                       <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <Link to='/' className="full-width-button delete-button">Delete Account</Link></div>
                </div>
            </div>

            
        </div>
    );
}

export default ParametreAgent;
