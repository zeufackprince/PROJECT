import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
import '../../root.css';
import Profil from "../../../pages/UserProfile/Profil";
import avatar from '../../../pages/UserProfile/profilImages/avatar.svg';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider";
import '../Search/Search.css';
import { getAllUsersProfile } from "../../../components/utils/ApiFunctions";

// Couleurs du thème clair
const lightTheme = {
    '--white': '#fff',
    '--lignt': '#222831',
    '--desaturate-fuscha': 'hsla(162, 94%, 57%, 0.15)',
    '--desaturate-fuscha-2': 'hsla(160, 94%, 57%, 0.1)',
    '--color-shadow': 'rgba(73, 73, 73, 0.35)',
    '--text-color-primary': '#314657',
    '--text-color-secondary': '#58626e',
    '--text-color-third': '#9db3be'
};

// Couleurs du thème sombre
const darkTheme = {
    '--white': '#222831',
    '--lignt': '#fff',
    '--desaturate-fuscha': 'hsla(162, 94%, 57%, 0.30)',
    '--desaturate-fuscha-2': 'hsla(160, 94%, 57%, 0.20)',
    '--color-shadow': 'rgba(190, 190, 190, 0.35)',
    '--text-color-primary': '#ffffff',
    '--text-color-secondary': '#ffffff',
    '--text-color-third': '#ffffff'
};

function Header() {
    const navLinksRef = useRef(null); // Référence pour les liens de navigation
    const profileContainer = useRef(null); // Référence pour le conteneur du profil
    const navigate = useNavigate(); // Utilisation de la navigation
    const { user, handleLogout } = useAuth(); // Utiliser le contexte d'authentification
    const [profileImage, setProfileImage] = useState(avatar); // Image de profil par défaut
    const [theme, setTheme] = useState(lightTheme); // Définition de l'état du thème

    // Récupérer les données de profil de l'utilisateur
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await getAllUsersProfile();
                if (profileData.posterUrl) {
                    setProfileImage(profileData.posterUrl);
                }
            } catch (error) {
                console.error('Error fetching user profile:', error.message);
            }
        };

        fetchUserProfile();
    }, []);

    // Gérer la fermeture du menu
    useEffect(() => {
        const listMenu = navLinksRef.current.querySelectorAll('ul li');

        const closeMenu = () => {
            if (navLinksRef.current) {
                navLinksRef.current.classList.remove('showMenu');
            }
        };

        listMenu.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        return () => {
            listMenu.forEach(item => {
                item.removeEventListener('click', closeMenu);
            });
        };
    }, []);

    // Rafraîchir la page
    const handleRefresh = () => {
        window.location.reload();
    };

    // Déconnecter l'utilisateur
    const logOut = () => {
        handleLogout();
        navigate('/');
        handleRefresh();
    };

    // Gérer le clic sur le profil
    const handleProfileClick = () => {
        if (user) {
            profileContainer.current.classList.toggle('activeProfile');
        } else {
            navigate('/auth/login');
        }
    };

    // Gérer le clic en dehors du profil pour fermer le conteneur du profil
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileContainer.current && !profileContainer.current.contains(event.target)) {
                profileContainer.current.classList.remove('activeProfile');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Charger et appliquer le thème sauvegardé
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            setTheme(parsedTheme);
            applyTheme(parsedTheme);
        }
    }, []);

    // Appliquer les propriétés du thème
    const applyTheme = (theme) => {
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(key, value);
        }
    };

    // Basculer entre les thèmes clair et sombre
    const toggleTheme = () => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        setTheme(newTheme);
        applyTheme(newTheme);
        localStorage.setItem('theme', JSON.stringify(newTheme));
    };

    return (
        <>
            <header>
                <nav className="navbar">
                    <NavLink className="logo" to='/'>IMMOBILIUS</NavLink>
                    <div className="nav-links" ref={navLinksRef}>
                        <ul>
                            <FaTimes className="closeMenu" onClick={() => navLinksRef.current.classList.remove('showMenu')} />
                            <li><NavLink to='/'>Acceuil</NavLink></li>
                            <li><NavLink to='/acheter'>Acheter</NavLink></li>
                            <li><NavLink to='/louer'>Louer</NavLink></li>
                            <li><NavLink to='/contact'>Contact</NavLink></li>
                            {user ? (
                                <button onClick={logOut} className="loginLink">Deconnexion</button>
                            ) : (
                                <NavLink to='/auth/login' className="loginLink"><span>Se connecter</span></NavLink>
                            )}
                        </ul>
                        
                        <Link to='/rechercher' className="searchBtn">
                            <FaSearch className="fa-solid faSearch" />
                        </Link>
                        {/* Switcher de theme */}
                    <div className="theme-switch-container">
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                onChange={toggleTheme} 
                                checked={theme === darkTheme} 
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                    </div>

                    <div className="profil">
                        <img 
                            src={profileImage} 
                            onClick={handleProfileClick} 
                            alt="User profile" 
                        />
                    </div>
                    <FaBars className="fa-solid fa-bars" onClick={() => navLinksRef.current.classList.toggle('showMenu')} />

                    
                </nav>
                {/*Informations du profil utilisateur*/}
                <div className="showProfile" ref={profileContainer}>
                    <FaTimes className="FaTimes" onClick={() => profileContainer.current.classList.remove('activeProfile')} />
                        <div className="profileInformation">
                            <Profil />
                        </div>
                </div>
            </header>
        </>
    );
}

export default Header;
