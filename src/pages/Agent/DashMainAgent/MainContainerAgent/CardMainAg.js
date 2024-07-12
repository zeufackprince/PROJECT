import React from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function CardMainAg({bienId, imgSrc, title, likes, type, prix, dimension, localisation,status}) {

    const navigate = useNavigate();
  
    const handlePublishClick = () => {
      navigate('/agent/publish-Logement', { state: { bienId } });
    };
  
    const handleUpdateClick = () => {
      navigate('/agent/update-Logement', { state: { bienId } });
    };
  
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
            <button onClick={handlePublishClick} className="button1 btn">Publication</button>
            <button onClick={handleUpdateClick} className="button1 btn">Modifier</button>
        </div>
    </div>
  )
}

export default CardMainAg;