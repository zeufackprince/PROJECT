
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
		return <div >Loading rooms....</div>
	}
	if (errorMessage) {
		return <div>Error : {errorMessage}</div>
	}

    return (
        <>
            <section className="presentation">
                {message && <p className="text-warning px-5">{message}</p>}
                {currentUser && (
                    <h6 className="text-success text-center"> You are logged-In as {currentUser}</h6>
                )}
                <div className="txtPres">
                    <h1>BIENVENU SUR IMMOBILIUS</h1>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi cum ullam fugiat cupiditate neque, fugit consequuntur reiciendis incidunt quis placeat odio quo, asperiores voluptatum facilis id veritatis expedita corrupti tempore.</h3>
                </div>
            </section>
            <section className="aboutUs">
                <div className="imgAboutUs">
                    <img src={house7} alt="About us" />
                </div>
                <div className="aboutImmo">
                    <h1>À propos de nous</h1>
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit...</h2>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi cum ullam fugiat cupiditate neque, fugit consequuntur reiciendis incidunt quis placeat odio quo, asperiores voluptatum facilis id veritatis expedita corrupti tempore.</h3>
                </div>
            </section>
            <section className="articlesImmo">
                <h1>Achetez/ louer un bien immobilier sur immobilius</h1>
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
        </>
    );
};

export default Acceuil;

