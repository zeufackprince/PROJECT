import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './filters.css';

function Filters() {
  const location = useLocation();

  return (
    <div className="filters">
        <div className="mine">
            <h2>Features</h2>
            <Link to='/agent/create-new-belonging' className="button2">New Belongings</Link>
        </div>
        <div className="filter_buttons">
            <Link 
              to='/agent/crud-logements' 
              className={`button2 ${location.pathname === '/agent/crud-logements' ? 'activeF' : ''}` /*Verifie si on se trouve dans la route et ajoute la classe 'activeF' au bouton */}
            >
              All
            </Link>
            <Link 
              to='/agent/room' 
              className={`button2 ${location.pathname === '/agent/room' ? 'activeF' : ''}`}
            >
              Room
            </Link>
            <Link 
              to='/agent/studios' 
              className={`button2 ${location.pathname === '/agent/studios' ? 'activeF' : ''}`}
            >
              Studios
            </Link>
            <Link 
              to='/agent/apartement' 
              className={`button2 ${location.pathname === '/agent/apartement' ? 'activeF' : ''}`}
            >
              Apartment
            </Link>
        </div>
    </div>
  )
}

export default Filters;
