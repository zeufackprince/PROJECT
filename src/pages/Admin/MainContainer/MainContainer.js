

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBelongings } from '../../../components/utils/ApiFunctions.js';
import './MainContainer.css';
import Banner from '../../../images/Admin/banner.jpg';
import CardMain from './CardMain.js';
import MainRightBottom from './MainRightBopttom.js';
import MainRightTop from './MainRightTop.js';

function MainContainer() {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await getAllBelongings();
        setPublications(data);
      } catch (error) {
        console.error('Error fetching publications:', error.message);
      }
    };
    
    fetchPublications();
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
          <div className="filters">
            <div className="mine">
              <h2>Features</h2>
              <Link to='/' className="button2">New Belongings</Link>
            </div>
            <div className="filter_buttons">
              <Link to='/' className="button1">All</Link>
              <Link to='/' className="button2">Room</Link>
              <Link to='/' className="button2">Studios</Link>
              <Link to='/' className="button2">Apartment</Link>
            </div>
          </div>

          <main>
            {publications.map(pub => (
              <CardMain
                key={pub.id}
                imgSrc={pub.posterUrl[0]}
                title={pub.nom}
                type={pub.type}
                localisation={pub.localisation}
                prix={pub.prix}
                dimension={pub.dimension}
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
