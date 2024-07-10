import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBelongings } from '../../../components/utils/ApiFunctions.js';
import './MainContainer.css';
import Banner from '../../../images/Admin/banner.jpg';
import CardMain from './CardMain.js';
import MainRightBottom from './MainRightBottom.js';
import MainRightTop from './MainRightTop.js';
import Filters from '../crud-app-logements/Filters.js';

function MainContainer() {
  const [belongings, setBelongings] = useState([]);

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
              <Link to='/' className="button1">Rent now</Link>
              <p>Ending In <span>5d:13h:20m</span></p>
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
        <MainRightTop />
        <MainRightBottom />
      </div>
    </div>
  );
}

export default MainContainer;
