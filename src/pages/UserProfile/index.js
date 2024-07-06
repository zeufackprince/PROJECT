// import React from 'react'
// import "./style.css"
// import { Link } from 'react-router-dom';
// import { PButton } from '../../components/_tools';

// const Profil = () => {
//   const user = "/user.png";
//   const deconnexion = () => { }
//   const modifier = () => { }
//   const changer = () => { }

//   return (
//     <div className='profil'>
//       <div className="userp">
//         <div className='userp-img-wrapper'>
//           <div className="userp-img">
//             <img src={user} alt="" />
//             <PButton changer={changer} />
//           </div>
//         </div>
//       </div>
//       <div className='info-container'>
//         <p>Noms</p>
//         <p>Prenoms</p>
//         <p>Ville</p>
//         <p>Contact</p>
//         <p>email</p>
//         <Link to="/profil update">
//           <PButton modifier={modifier} />
//         </Link>
//       </div>
//       <PButton deconnexion={deconnexion} />
//     </div>
//   )
// }

// export default Profil

import React, { useEffect, useState } from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import { PButton } from '../../components/_tools/_tools';
import { getAllUsersProfile } from '../../components/utils/ApiFunctions';

const Profil = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getAllUsersProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const deconnexion = () => {
    // Implement deconnexion logic
  };

  const modifier = () => {
    // Implement modifier logic
  };

  const changer = () => {
    // Implement changer logic
  };

  return (
    <div className='profil'>
      {userProfile ? (
        <>
          <div className="userp">
            <div className='userp-img-wrapper'>
              <div className="userp-img">
                <img src={userProfile.posterUrl} alt={userProfile.name} className="user-image" />
                <PButton changer={changer} />
              </div>
            </div>
          </div>
          <div className='info-container'>
            <p>{userProfile.name}</p>
            <p>{userProfile.role}</p>
            <p>{userProfile.telephone}</p>
            <p>{userProfile.email}</p>
            <Link to="/profil-update">
              <PButton modifier={modifier} />
            </Link>
          </div>
          <PButton deconnexion={deconnexion} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profil;
