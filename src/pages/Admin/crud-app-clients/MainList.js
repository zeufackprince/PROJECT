import React, { useState, useEffect } from 'react';
import './MainList.css';
import UserList from './UserList.js';
import { getAllAgent, getAllUsers } from '../../../components/utils/ApiFunctions.js';  

function MainList() {
  const [users, setUsers] = useState([]);
  const [agent, setAgent] = useState([]);

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

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const usersData = await getAllAgent();
        setAgent(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAgent();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="mainList">
      {/* <button onClick={() => alert('Add User')} className='btn-add'>Add an User <span>+</span></button> */}
      <div><h2>LIST OF AGENTS</h2></div>
      <UserList users={agent} onDelete={handleDelete} />

      <div><h2>LIST OF USERS</h2></div>
      <UserList users={users} onDelete={handleDelete} />
    </div>
  );
}

export default MainList;
