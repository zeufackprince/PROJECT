import React, { useEffect } from 'react';
import './agentMenu.css';
import { Link } from 'react-router-dom';
import {
  FaEnvelope,
  FaUsers,
  FaSignOutAlt,
  FaBuilding,
  FaBorderAll,
  FaCog
} from "react-icons/fa";
import { useAuth } from '../../Auth/AuthProvider';


function AgentMenu() {
  const { user, handleLogout } = useAuth()
  
  useEffect(() => {
    const mainMenuLi = document.querySelectorAll("#main-Menu li")
    function changeActive() {
      mainMenuLi.forEach(n => n.classList.remove("active"));
      this.classList.add("active");
    }
    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive))
  }, []);

  
  return (
    <menu>
       <h1 className='logo'>IMMOBILIUS</h1>
        <ul id="main-Menu">
          <li><Link to='/agent/dashboard'><FaBorderAll /><span>Dashboard</span> </Link></li>
          <li><Link to='/agent/notification'><FaEnvelope /><span>Notifications</span></Link></li>
          <li><Link to='/agent/crud-logements'><FaBuilding /><span>Logements</span></Link></li>
        </ul>

        <ul className='last-Menu'>
        <li><Link to=''><FaCog /><span>Paramètres</span></Link></li>
        <li><Link onClick={handleLogout}><FaSignOutAlt /><span>Déconnexion</span></Link></li>
        </ul>
    </menu>
  );
}

export default AgentMenu;
