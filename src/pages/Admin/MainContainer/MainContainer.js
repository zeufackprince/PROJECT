// import React from 'react';
// import './MainContainer.css';
// import { Link } from 'react-router-dom';
// import Banner from '../../../images/Admin/banner.jpg';
// import CardMain from './CardMain.js';
// import MainRightBopttom from './MainRightBopttom.js';
// import MainRightTop from './MainRightTop.js';

// import Card1 from '../../../images/Admin/card-1.jpg';
// import Card2 from '../../../images/Admin/card-2.jpg';
// import Card3 from '../../../images/Admin/card-3.jpg';
// import Card4 from '../../../images/Admin/card-4.jpg';
// import Card5 from '../../../images/Admin/card-5.jpg';
// import Card6 from '../../../images/Admin/card-6.jpg';
// import Card7 from '../../../images/Admin/card-7.jpg';
// import Card8 from '../../../images/Admin/card-8.jpg';

// function MainContainer() {
    
//   return (
    
//     <div className='MainContainer'>
//         <div className="left">
//             <div className="banner" style = {{
//                 background : `url(${Banner})`, 
//                 backgroundRepeat : 'no-repeat', 
//                 backgroundPosition : 'center',
//                 backgroundSize : 'cover'}}>

//                 <div className="textBanner">
//                     <h1>Living Room</h1>
//                     <h2>2.500 $</h2>
//                     <p>Uploaded by Marc Annil</p>
//                     <div className="bid">
//                         <Link to='/' className="button1">Rent now</Link>
//                         <p>Ending In <span>5d:13h:20m</span></p>
//                     </div>
//                 </div>
//             </div>

//             <div className="Cards">
//                 <div className="filters">
//                     <div className="mine">
//                         <h2>Features</h2>
//                         <Link to='/' className="button2">My posts</Link>
//                     </div>
//                     <div className="filter_buttons">
//                         <Link to='/' className="button1">All</Link>
//                         <Link to='/' className="button2">Housing</Link>
//                         <Link to='/' className="button2">Studios</Link>
//                         <Link to='/' className="button2">Apartment</Link>
//                     </div>
//                 </div>

//                 <main>
//                     <CardMain imgSrc={Card1} title={"House 1"} likes={"35"}/>
//                     <CardMain imgSrc={Card2} title={"House 2"} likes={"45"}/>
//                     <CardMain imgSrc={Card3} title={"House 3"} likes={"17"}/>
//                     <CardMain imgSrc={Card4} title={"House 4"} likes={"53"}/>
//                     <CardMain imgSrc={Card5} title={"House 5"} likes={"28"}/>
//                     <CardMain imgSrc={Card6} title={"House 6"} likes={"11"}/>
//                     <CardMain imgSrc={Card7} title={"House 7"} likes={"33"}/>
//                     <CardMain imgSrc={Card8} title={"House 8"} likes={"19"}/>
//                 </main>
//             </div>
//         </div>
//         <div className="right">
//             <MainRightTop />
//             <MainRightBopttom />
//         </div>
//     </div>
//   )
// }

// export default MainContainer

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPublication } from '../../../components/utils/ApiFunctions.js';
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
        const data = await getAllPublication();
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
              <Link to='/' className="button2">My posts</Link>
            </div>
            <div className="filter_buttons">
              <Link to='/' className="button1">All</Link>
              <Link to='/' className="button2">Housing</Link>
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
