import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './filters.css';

function Filters() {
  const location = useLocation();

  return (
    <div className="filters">
        <div className="mine">
            <h2>Features</h2>
            <Link to='/admin/create-new-belonging' className="button2">New Belongings</Link>
        </div>
        <div className="filter_buttons">
            <Link 
              to='/admin/crud-logements' 
              className={`button2 ${location.pathname === '/admin/crud-logements' ? 'activeF' : ''}` /*Verifie si on se trouve dans la route et ajoute la classe 'activeF' au bouton */}
            >
              All
            </Link>
            <Link 
              to='/admin/room' 
              className={`button2 ${location.pathname === '/admin/room' ? 'activeF' : ''}`}
            >
              Room
            </Link>
            <Link 
              to='/admin/studios' 
              className={`button2 ${location.pathname === '/admin/studios' ? 'activeF' : ''}`}
            >
              Studios
            </Link>
            <Link 
              to='/admin/apartement' 
              className={`button2 ${location.pathname === '/admin/apartement' ? 'activeF' : ''}`}
            >
              Apartment
            </Link>
        </div>
    </div>
  )
}

export default Filters;
