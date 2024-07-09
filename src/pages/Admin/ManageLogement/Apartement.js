import React from 'react';
import Filters from '../crud-app-logements/Filters';
import '../crud-app-logements/Main.css'

function Apartement() {
  return (
    <div className='Apartement'>
      <div className="Cards">
        <Filters />
      </div>
    </div>
  )
}

export default Apartement;