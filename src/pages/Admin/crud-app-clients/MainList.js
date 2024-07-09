import React, { useState, useEffect } from 'react';
import './MainList.css';
import UserList from './UserList.js';
import { getAllUsers } from '../../../components/utils/ApiFunctions.js';  

function MainList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="mainList">
      <h1>IMMOBILIUS</h1>
      {/* <button onClick={() => alert('Add User')} className='btn-add'>Add an User <span>+</span></button> */}
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
}

export default MainList;
