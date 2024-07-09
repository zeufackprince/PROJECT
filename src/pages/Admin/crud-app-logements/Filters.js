import React from 'react';
import { Link } from 'react-router-dom';


function Filters() {
  return (
    <div className="filters">
        <div className="mine">
            <h2>Features</h2>
            <Link to='/admin/create-new-belonging' className="button2">New Belongings</Link>
        </div>
        <div className="filter_buttons">
            <Link to='/admin/crud-logements' className="button1">All</Link>
            <Link to='/admin/room' className="button2">Room</Link>
            <Link to='/admin/studios' className="button2">Studios</Link>
            <Link to='/admin/apartement' className="button2">Apartment</Link>
        </div>
    </div>
  )
}

export default Filters;