import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom"
import { getPublicationByStatus2 } from '../../../components/utils/ApiFunctions';
import './louer.css'

const Louer = ({addFavori, favoris}) => {
  
        const [biens, setBiens] = useState([]);
        const [errorMessage, setErrorMessage] = useState("")
        const [isLoading, setIsLoading] = useState(false)
    
        const location = useLocation()
    
        const message = location.state && location.state.message
        const currentUser = localStorage.getItem("userId")
    
    
        useEffect(() => {
            setIsLoading(true)
            getPublicationByStatus2()
                .then((data) => {
                    setBiens(data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    setErrorMessage(error.message)
                    setIsLoading(false)
                })
        }, [])
    
        const [addedFavoriIds, setAddedFavoriIds] = useState([]);
    
        const handleAddFavori = (bien) => {
            if (!addedFavoriIds.includes(bien.id)) {
                addFavori(bien);
                setAddedFavoriIds([...addedFavoriIds, bien.id]);
                setTimeout(() => {
                    setAddedFavoriIds(prevIds => prevIds.filter(id => id !== bien.id));
                }, 3000);
            }
        };
    
        if (isLoading) {
            return (
                <div class="loader-container">
                    <div class="bouncing-dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            )
        }
        if (errorMessage) {
            return <div className='error-message'>Error : {errorMessage}</div>
        }
    
        return (
           <section className="acheterImmo">   
           <h1>LOUER UN BIEN IMMOBILIER</h1>
            {message && <p className="text-warning px-5">{message}</p>}
                   
             <div className="listBien">
                    {biens.map(bien => (
                    <div className="bienImmo" key={bien.id}>
                       
                        <img src={bien.posterUrl[0]} alt="" /> {/* Assuming posterUrl is an array of URLs */}
                            <div className="bien-immo-name">
                                <p>{bien.titre}</p>
                                <p>{`${bien.type}`}</p>
                            </div>
                            <div className="immo-infos">
                                <p className="price-home">{`${bien.prix} Fcfa`}</p>
                                <p>A {`${bien.status}`}</p>
                                <p>{`${bien.dimension}`} m<sup>2</sup></p>
                                <p>{`${bien.localisation}`}</p>
                            </div>
                            <FaHeart 
                                className={`addToFavori ${favoris.some(favori => favori.id === bien.id) ? 'addedFavori' : ''}`} 
                                onClick={() => handleAddFavori(bien)} 
                                />
                                {addedFavoriIds.includes(bien.id) && <p className="favoriAddedMessage">Ajouté en favori</p>}
                                <Link to={`/detail/${bien.id}`} className="more">En savoir plus</Link>
                    </div>
                            ))}
                </div>
           </section>
        );
    
};

export default Louer;