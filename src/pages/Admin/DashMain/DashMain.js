//Tableau de bord 
import React from 'react'
import './DashMain.css'
import TopContainer from './DashTopContainer.js'
import DashMainContainer from '../DashMainContainer/DashMainContainer.js';

function DashMain() {
  return (
    <div className='Container'>
        <TopContainer />
        <DashMainContainer />
    </div>
  );
}

export default DashMain