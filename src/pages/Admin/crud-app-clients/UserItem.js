// import React from 'react';
// import { BsBanFill } from "react-icons/bs";
// import { FaUserMinus } from "react-icons/fa";

// const UserItem = ({ User, onDelete }) => {
//   return (
//     <tr>
//       <td>{User.nom}</td>
//       <td>{User.email}</td>
//         <td>{User.numero}</td>
//       <td className='btn-action'>
//         <i onClick={() => alert(`Block ${User.nom}`)}>
//             <BsBanFill />
//         </i>
//         <i onClick={() => alert(`Delete ${User.nom}`)}>
//             <FaUserMinus />
//         </i>
//       </td>
//     </tr>
//   );
// };

// export default UserItem;

import React from 'react';
import './MainList.css';
import { FaTimes } from 'react-icons/fa';
const UserItem = ({ user, onDelete }) => {
  return (
    <tr className='UserCrudContainer'>
      <td><img src={user.posterUrl} alt={user.name} className="user-image" /></td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.telephone}</td>
      <td>
        <button onClick={() => onDelete(user.id)}><FaTimes className='faTimes'/><span>Delete</span></button>
      </td>
    </tr>
  );
};

export default UserItem;

