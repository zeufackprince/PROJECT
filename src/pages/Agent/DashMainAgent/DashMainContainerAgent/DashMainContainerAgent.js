import React, { useEffect, useState,useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAllBelongings } from '../../../../components/utils/ApiFunctions.js';
import Banner from '../../../../images/Admin/banner.jpg';
import CardMain from './CardMainAg.js'
import AdminMessages from './AgentMessages.js';
import '../../../Admin/DashMainContainer/DashMainContainer.css';
import Filters from '../../crud-app-logements/FiltersAg.js';
import { FaEnvelope } from 'react-icons/fa';

function MainContainerAgent() {
  const [belongings, setBelongings] = useState([]);
  const msgContainerRef = useRef(null); // Référence pour le conteneur des messages
  const buttonRef = useRef(null); // Référence pour le bouton enveloppe-cont

  useEffect(() => {
    const fetchBelongings = async () => {
      try {
        const data = await getAllBelongings();
        setBelongings(data);
      } catch (error) {
        console.error('Error fetching publications:', error.message);
      }
    };
    
    fetchBelongings();
  }, []);

  
  // Gérer le clic sur le bouton enveloppe-cont
  const handleButtonClick = () => {
    if (msgContainerRef.current) {
      msgContainerRef.current.classList.toggle('active-msg');
    }
  };

  // Gérer le clic en dehors du conteneur des messages
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (msgContainerRef.current && !msgContainerRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        msgContainerRef.current.classList.remove('active-msg');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='MainContainer'>
      <div className="left">
        <div className="banner" style={{
          background: `url(${Banner})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
          <div className="textBanner">
            <h1>Living Room</h1>
            <h2>2.500 $</h2>
            <p>Uploaded by Marc Annil</p>
            <div className="bid">
              <Link to='/' className="button1">Publier</Link>
              <Link to='/' className="button1">Modifier</Link>
            </div>
          </div>
        </div>

        <div className="Cards">
          <Filters />
          <main>
            {belongings.map(pub => (
              <CardMain
                key={pub.id}
                bienId={pub.id}
                imgSrc={pub.posterUrl[0]}
                title={pub.nom}
                type={pub.type}
                localisation={pub.localisation}
                prix={pub.prix}
                dimension={pub.dimension}
                status={pub.status}
                likes={"35"} // This can be replaced with actual data if available
              />
            ))}
          </main>
        </div>
      </div>
      <div className="right">
        <button className='enveloppe-cont' ref={buttonRef} onClick={handleButtonClick}>
          <FaEnvelope className='enveloppe-msg' />
        </button>
        <div className="msg-container" ref={msgContainerRef}>
          <AdminMessages/>
        </div>
      </div>
    </div>
  );
}

export default MainContainerAgent;
