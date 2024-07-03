
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { getBelongingsById } from '../../utils/ApiFunctions';
import { Carousel } from 'react-bootstrap'; // Import Carousel from react-bootstrap

const Details = () => {
    const { id } = useParams();
    const [bien, setBien] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getBelongingsById(id)
            .then((data) => {
                setBien(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, [id]);

    if (isLoading) {
        return <div>Loading details...</div>;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    if (!bien) {
        return <div>Bien not found</div>;
    }

    return (
        <div className="details">
            <h1>{bien.nom}</h1>
            <div id="carouselExample" className="carousel slide">
                <Carousel>
                    {bien.posterUrl.map((url, index) => (
                        <Carousel.Item key={index} className={index === 0 ? 'active' : ''}>
                            <img className="d-block w-100" src={url} alt={`Slide ${index}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <h3 className="price">{`${bien.prix} Fcfa`}</h3>
            <h5 className="description">{bien.type} - {bien.dimension}</h5>
            <h4 className="localisation">{bien.localisation}</h4>
            <button onClick={() => alert("Contactez l'agent immobilier")}>Contacter l'agent immobilier</button>
        </div>
    );
};

export default Details;

