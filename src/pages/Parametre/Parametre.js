import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './parametre.css';
import { getAllUsersProfile } from '../../components/utils/ApiFunctions'; 
import { FaPen } from 'react-icons/fa';

function Parametre() {
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

    // const handleEditProfile = () => {
    //     navigate('/edit-profile'); // Navigate to the edit profile form
    // };

    // const handleCreateAgent = () => {
    //     navigate('/create-agent'); // Navigate to the create agent form
    // };

    // const handleDeleteAccount = () => {
    //     // Here you can add your logic for deleting the account
    //     // This could be a confirmation dialog followed by an API call to delete the user's account
    //     console.log('Delete account');
    // };

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="setting-container">

            <div className="profile-section">
                <h2>ADMIN PROFILE</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <div className='back-color'></div>

                <div className="profile-details">
                    <img src={profile.posterUrl} alt={profile.name} className="profile-image" />

                    <div className="profile-info">
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Role:</strong> {profile.role}</p>
                        <Link to='/admin/editer-profil' className="edit-profile-button"><FaPen/> Edit Profile</Link>
                    </div>

                </div>

                <div className="action-buttons">
                    <h3>Parametres</h3>
                    <p></p>
                        <Link to='/admin/new-agent' className="full-width-button">Create New Agent</Link>
                       <Link to='/' className="full-width-button delete-button">Delete Account</Link>
                    
                </div>
            </div>

            
        </div>
    );
}

export default Parametre;
