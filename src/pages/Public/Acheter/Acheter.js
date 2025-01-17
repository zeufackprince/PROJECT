import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom"
import { getPublicationByStatus } from '../../../components/utils/ApiFunctions';
import './acheter.css'

const Acheter = ({addFavori, favoris}) => {
    const [biens, setBiens] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

    const location = useLocation()

	const message = location.state && location.state.message
	const currentUser = localStorage.getItem("userId")


    useEffect(() => {
		setIsLoading(true)
		getPublicationByStatus()
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
       <h1>ACHETER UN BIEN IMMOBILIER</h1>
        {message && <p className="text-warning px-5">{message}</p>}
               
         <div className="listBien">
                {biens.map(bien => (
                <div className="bienImmo" key={bien.id}>
                    <img src={bien.posterUrl[0]} alt="" /> {/* Assuming posterUrl is an array of URLs */}
                        <p className="titreArticle">{bien.nom}</p>
                        <p className="price">{`${bien.prix}Fcfa`}</p>
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
    );
};

export default Acheter;