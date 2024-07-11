import React from 'react';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

function CardMain({imgSrc, title, likes, type, prix, dimension, localisation,status}) {
  return (
    <div className='Card-Main'>
        <img src={imgSrc} alt="" />

        <div className="card_main_name">
            <h2>{title}</h2>
            <h2>{type}</h2>

            <div className="card_icon">
                <i>
                    <FaHeart />
                    <span>{likes}</span>
                </i>
            </div>
        </div>
        
        <div className="stats">
            <p>Prix <span>{prix}FCFA</span></p>
            <p>Etat <span>{status}</span></p>
            <p>Dimension<span>{dimension}</span></p>
            <p>Localisation<span>{localisation}</span></p>

        </div>

        <div className="card-button">
            <Link to='/admin/publish-Logement' className="button1">Publication</Link>
            <Link to='/admin/update-Logement' className="button2">Modify</Link>
        </div>
    </div>
  )
}

export default CardMain;