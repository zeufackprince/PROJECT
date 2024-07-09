import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';
import '../../root.css';
import Profil from "../../../pages/UserProfile/index";
import avatar from '../../../pages/UserProfile/profilImages/avatar.svg';
import { FaBars, FaSearch, FaTimes, FaHeart } from 'react-icons/fa';
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthProvider"; // Import the auth context
import '../Search/Search.css';

function Header() {
    const navLinksRef = useRef(null); // Référence pour les liens de navigation
    const profileContainer = useRef(null); // Référence pour le conteneur du profil
    const navigate = useNavigate(); // Utilisation de la navigation

    const { user, handleLogout } = useAuth(); // Utiliser le contexte d'authentification

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
      };// Actualise la page lorsqu'elle est appelée

    const logOut = () => {
        handleLogout();
        handleRefresh(); 
    } //Deconnecte l'utilisateur et rafraichi la page

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
                                <li><button onClick={logOut} className="loginLink">Logout</button></li>
                            ) : (
                                <li><NavLink to='/auth/login' className="loginLink">Se connecter</NavLink></li>
                            )}
                        </ul>
                        <button className="searchBtn">
                            <Link to='/rechercher'><FaSearch className="fa-solid faSearch" /></Link>
                        </button>
                    </div>

                    <div className="profil">{/*Photo de profil de l'utilisateur*/}
                        <img src={avatar} onClick={() => profileContainer.current.classList.toggle('activeProfile')} /> 
                    </div>
                    <FaBars className="fa-solid fa-bars" onClick={() => navLinksRef.current.classList.toggle('showMenu')} />
                </nav>

                <div className="showProfile" ref={profileContainer}>
                    <FaTimes className="FaTimes" onClick={() => profileContainer.current.classList.remove('activeProfile')} />
                    <div className="dashboard">
                        <div className="profileInformation">
                            <Link to='/Favoris' className="favoriLink">
                                Favoris <FaHeart className="favori" />
                            </Link>
                            <div className="userInfo">
                                <Profil />
                            </div>
                            <Link to='/UserProfile' className="logOut">
                                Modifier
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
