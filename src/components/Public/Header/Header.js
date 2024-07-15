import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
import '../../root.css';
import Profil from "../../../pages/UserProfile/Profil";
import avatar from '../../../pages/UserProfile/profilImages/avatar.svg';
import { FaBars, FaSearch, FaTimes, FaHeart } from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "../../Auth/AuthProvider"; // Import the auth context
import '../Search/Search.css';
import { getAllUsersProfile } from "../../../components/utils/ApiFunctions"; // Import the function to fetch user profile

//Couleurs du theme clair
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

//Couleurs du theme sombre
const darkTheme = {
    '--white': '#222831',
    '--lignt': '#fff',
    '--desaturate-fuscha': 'hsla(162, 94%, 57%, 0.30)',
    '--desaturate-fuscha-2': 'hsla(160, 94%, 57%, 0.20)',
    '--color-shadow': 'rgba(255, 255, 255, 0.35)',
    '--text-color-primary': '#ffffff',
    '--text-color-secondary': '#ffffff',
    '--text-color-third': '#ffffff'
};

function Header() {
    const navLinksRef = useRef(null); // Référence pour les liens de navigation
    const profileContainer = useRef(null); // Référence pour le conteneur du profil
    const navigate = useNavigate(); // Utilisation de la navigation

    const { user, handleLogout } = useAuth(); // Utiliser le contexte d'authentification

    const [profileImage, setProfileImage] = useState(avatar); // default to avatar

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

    useEffect(() => {
        const listMenu = navLinksRef.current.querySelectorAll('ul li'); // Liste des éléments de menu

        // Fermer le menu
        const closeMenu = () => {
            if (navLinksRef.current) {
                navLinksRef.current.classList.remove('showMenu');
            }
        };

        // Ajouter des gestionnaires d'événements pour chaque élément de menu
        listMenu.forEach(item => {
            item.addEventListener('click', closeMenu);
        });

        // Nettoyer les gestionnaires d'événements
        return () => {
            listMenu.forEach(item => {
                item.removeEventListener('click', closeMenu);
            });
        };
    }, []);

    const handleRefresh = () => {
        window.location.reload();
    }; // Actualise la page lorsqu'elle est appelée

    const logOut = () => {
        handleLogout();
        navigate('/'); // Redirige l'utilisateur vers la route '/'
        handleRefresh();
    }; // Deconnecte l'utilisateur et rafraichi la page

    const handleProfileClick = () => {
        if (user) {
            profileContainer.current.classList.toggle('activeProfile'); // Active le profil si l'utilisateur est connecté
        } else {
            navigate('/auth/login'); // Redirige vers la route '/auth/login' si l'utilisateur n'est pas connecté
        }
    };


    const [theme, setTheme] = useState(lightTheme);// Definition de l'etat du theme

    
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const parsedTheme = JSON.parse(savedTheme);
            setTheme(parsedTheme);
            applyTheme(parsedTheme);
        }
    }, []);// Savegarde le theme choisi

    const applyTheme = (theme) => {
        for (const [key, value] of Object.entries(theme)) {
            document.documentElement.style.setProperty(key, value);
        }
    };

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
                    </div>

                    <div className="profil">
                        <img 
                            src={profileImage} 
                            onClick={handleProfileClick} 
                            alt="User profile" 
                        />
                    </div>
                    <FaBars className="fa-solid fa-bars" onClick={() => navLinksRef.current.classList.toggle('showMenu')} />
                        {/*Switcher de theme*/}
                <div className="App">
                    <button onClick={toggleTheme} className="loginLink">Theme</button>
                </div>
                </nav>
                
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
