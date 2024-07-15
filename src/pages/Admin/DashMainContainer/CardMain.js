import React from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate} from 'react-router-dom';

function CardMain({ bienId, imgSrc, title, likes, type, prix, dimension, localisation, status }) {
  const navigate = useNavigate();

  const handlePublishClick = () => {
    navigate('/admin/publish-Logement', { state: { bienId } });
  };

  const handleUpdateClick = () => {
    navigate('/admin/update-Logement', { state: { bienId } });
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
            <button onClick={handlePublishClick} className="button1">Publication</button>
            <button onClick={handleUpdateClick} className="button1">Modifier</button>
        </div>
    </div>
  );
}

export default CardMain;