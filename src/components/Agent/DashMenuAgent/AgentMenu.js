import React, { useEffect , useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaHome,
  FaSignOutAlt,
  FaBuilding,
  FaBorderAll,
  FaCog
} from "react-icons/fa";
import { AuthContext } from "../../Auth/AuthProvider"


function AgentMenu() {

  const auth = useContext(AuthContext);
  const navigate = useNavigate()
  
  useEffect(() => {
    const mainMenuLi = document.querySelectorAll("#main-Menu li")
    function changeActive() {
      mainMenuLi.forEach(n => n.classList.remove("active"));
      this.classList.add("active");
    }
    mainMenuLi.forEach((n) => n.addEventListener("click", changeActive))
  }, []);

  const handleLogout = () => {
    auth.handleLogout();
    navigate('/', { state: { message: "You have been logged out!" } });
  }

  
  return (
    <menu>
       <h1 className='logo'>IMMOBILIUS</h1>
        <ul id="main-Menu">
          <li><Link to='/'><FaHome /><span>Accuile</span> </Link></li>
          <li><Link to='/agent/dashboard'><FaBorderAll /><span>Dashboard</span> </Link></li>
          <li><Link to='/agent/notification'><FaEnvelope /><span>Notifications</span></Link></li>
          <li><Link to='/agent/crud-logements'><FaBuilding /><span>Logements</span></Link></li>
        </ul>

        <ul className='last-Menu'>
        <li><Link to='/agent/parametre'><FaCog /><span>Paramètres</span></Link></li>
        <li><button onClick={handleLogout} className="logout-button"><FaSignOutAlt /><span>Déconnexion</span></button></li>
        </ul>
    </menu>
  );
}

export default AgentMenu;
