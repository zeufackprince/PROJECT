import React, { useEffect, useState } from 'react';
import CardMain from '../DashMainContainer/CardMain';
import { getAllBelongings } from '../../../components/utils/ApiFunctions';
import './Logements.css';
import Filters from './Filters';

function Main() {
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
    <div className='Main'>
        <div className="Cards">
            <Filters/>
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
                />
                ))}
            </main>
        </div>
    </div>
  )
}

export default Main;