import React, { useEffect, useState } from 'react';
import Filters from '../crud-app-logements/FiltersAg';
import { getBelongingsBytype2 } from '../../../components/utils/ApiFunctions'; // Import the API function
import { FaHeart } from 'react-icons/fa'; // Import the FaHeart icon
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import './typebelongings.css'; // Import the CSS file

function Studios() {
    const [belongings, setBelongings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBelongings = async () => {
            try {
                const data = await getBelongingsBytype2();
                setBelongings(data);
                setIsLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                setIsLoading(false);
            }
        };

        fetchBelongings();
    }, []);

    const handlePublishClick = (id) => {
        navigate('/agent/publish-Logement', { state: { id } });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return (
        <div className="room-container">
            <Filters />
            <main>
                {belongings.map((belonging) => (
                    <div key={belonging.id} className='Card-Main'>
                        <img src={belonging.posterUrl[0]} alt={belonging.nom} className="belonging-image" />

                        <div className="card_main_name">
                            <h2>{belonging.nom}</h2>
                            <h2>{belonging.type}</h2>

                            <div className="card_icon">
                                <i>
                                    <FaHeart />
                                    <span>{belonging.likes}</span>
                                </i>
                            </div>
                        </div>
                        
                        <div className="stats">
                            <p>Prix <span>{belonging.prix} FCFA</span></p>
                            <p>Etat <span>{belonging.status}</span></p>
                            <p>Dimension <span>{belonging.dimension} m<sup>2</sup></span></p>
                            <p>Localisation <span>{belonging.localisation}</span></p>
                        </div>

                        <div className="card-button">
                            <button onClick={() => handlePublishClick(belonging.id)} className="button1">Publication</button>
                            <Link to='/agent/update-Logement' className="button1">Modify</Link>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default Studios;
