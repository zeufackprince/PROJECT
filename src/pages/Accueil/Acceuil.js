
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom"
import './Acceuil.css';
import '../../components/root.css';
import house7 from '../../images/houses/house7.jpg';

import { getAllPublication } from "../../components/utils/ApiFunctions"


const Acceuil = ({ addFavori, favoris }) => {
    const [biens, setBiens] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

    const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")


    useEffect(() => {
		setIsLoading(true)
		getAllPublication()
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
            )// ...loading icons...
	}
	if (errorMessage) {
		return <div className='error-message'>Error : {errorMessage}</div>
	}// Message d'erreur

    return (
        <>
            <section className="presentation">
                {message && <p className="text-warning px-5">{message}</p>}
                
                <div className="txtPres">
                    <h1>    BIENVENU SUR IMMOBILIUS</h1>
                    <h3>    Nous sommes ravis de vous accueillir sur notre plateforme dédiée à l'immobilier. Que vous cherchiez à acheter, louer des propriétés, IMMOBILIUS est là pour simplifier votre expérience. Explorez nos fonctionnalités et trouvez la propriété de vos rêves dès aujourd'hui !</h3>
                </div>
            </section>
            <section className="aboutUs">
                <div className="imgAboutUs">
                    <img src={house7} alt="About us" />
                </div>
                <div className="aboutImmo">
                    <h1>À propos de nous</h1>
                    <h2>IMMOBILIUS est votre plateforme de confiance pour toutes vos transactions immobilières. </h2>
                    <h3> Nous simplifions la recherche, l'achat et la location de biens immobiliers grâce à notre interface intuitive et nos outils puissants. Que vous soyez à la recherche d'une nouvelle maison ou d'un bien à louer, nous sommes là pour vous accompagner à chaque étape.</h3>
                </div>
            </section>
            <section className="articlesImmo">
                <h1>Achetez/ louer un bien immobilier sur immobilius</h1>
                <div className="listBien">{/*Affiche les biens immobilier sur la page acceuil*/}
                    {biens.map(bien => (
                        <div className="bienImmo" key={bien.id}>
                            <img src={bien.posterUrl[0]} alt="" /> {/* Assuming posterUrl is an array of URLs */}
                            <div className="bien-immo-name">
                                <p>{bien.titre}</p>
                                <p>{`${bien.type}`}</p>
                            </div>
                            <div className="immo-infos">
                                <p className="price-home">{`${bien.prix}Fcfa`}</p>
                                <p>A {`${bien.status}`}</p>
                                <p>{`${bien.dimension}`} m<sup>2</sup></p>
                                <p>{`${bien.localisation}`}</p>
                            </div>
                            {/* <p className='description'>{bien.description}</p> */}
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
        </>
    );
};

export default Acceuil;

