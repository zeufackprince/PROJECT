import React, { useEffect, useContext } from 'react';
import './DashMenu.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaUsers,
  FaSignOutAlt,
  FaBuilding,
  FaBorderAll,
  FaCog
} from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthProvider"

function DashMenu() {
  
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    const mainMenuLi = document.querySelectorAll("#main-Menu li");
    function changeActive() {
      mainMenuLi.forEach(n => n.classList.remove("active"));
      this.classList.add("active");
    }
    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive));
  }, []);

  const handleLogout = () => {
    auth.handleLogout();
    navigate('/auth/login', { state: { message: "You have been logged out!" } });
  }

  return (
    <menu>
       <h1 className='logo'>IMMOBILIUS</h1>
        <ul id="main-Menu">
          <li className='active'><Link to='/admin/dashboard'><FaBorderAll /><span>Dashboard</span></Link></li>
          <li><Link to='/admin/crud-client'><FaUsers /><span>Clients</span></Link></li>
          <li><Link to='/admin/notification'><FaEnvelope /><span>Notifications</span></Link></li>
          <li><Link to='/admin/crud-logements'><FaBuilding /><span>Logements</span></Link></li>
        </ul>

        <ul className='last-Menu'>
          <li><Link to='/admin/parametre'><FaCog /><span>Paramètres</span></Link></li>
          <li><button onClick={handleLogout} className="logout-button"><FaSignOutAlt /><span>Déconnexion</span></button></li>
        </ul>
    </menu>
  );
}

export default DashMenu;
