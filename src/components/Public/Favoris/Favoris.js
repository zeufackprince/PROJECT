import React from 'react';
import './Favoris.css'
import '../../root.css'
import x_cross from './x_cross.svg'
import { Link } from 'react-router-dom';

const Favoris = ({ favoris, removeFavori }) => {
    return (
        <>
            <div className="favoriContainer">
                <h1>Mes Favoris</h1>

                <div className='favoriContent'>
                    {favoris.length === 0 ? (
                        <p>Aucun favori ajouté.</p>
                    ) : (
                        favoris.map(bien => (
                            <div key={bien.id} className="bienImmoFav">
                                <Link to={`/detail/${bien.id}`} className='moreDetails'>
                                    <img src={bien.posterUrl[0]} alt={bien.nom} /> {/* Assuming posterUrl is an array of URLs */}
                                    <p className="titreArticleFav">{bien.nom}</p>
                                    <p className="priceFav">{`${bien.prix} Fcfa`}</p>
                                </Link>
                                <img src={x_cross} className="removeFav" onClick={() => removeFavori(bien.id)} alt="Remove favorite"/>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Favoris;
