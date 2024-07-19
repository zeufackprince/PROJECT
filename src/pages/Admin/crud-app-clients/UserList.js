// import React from 'react';
// import UserItem from './UserItem';

// const UserList = ({ User, onDelete }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Nom</th>
//           <th>Email</th>
//           <th>Numero</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {User.map(User => (
//           <UserItem key={User.name} User={User} onDelete={onDelete} />
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default UserList;


import React from 'react';
import UserItem from './UserItem';

const UserList = ({ users, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Profil</th>
          <th>Nom</th>
          <th>Email</th>
          <th>Numero</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <UserItem key={user.id} user={user} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
