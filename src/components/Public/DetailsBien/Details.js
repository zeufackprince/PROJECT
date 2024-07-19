import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import { getAllPubById } from '../../utils/ApiFunctions';
import { sendNotification } from '../../utils/ApiFunctions';
import '../../../components/root.css';

const Details = () => {
    const { id } = useParams();
    const [bien, setBien] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(localStorage.getItem(`successMessage-${id}`) || "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [contactMessage, setContactMessage] = useState("");

    useEffect(() => {
        getAllPubById(id)
            .then((data) => {
                setBien(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsLoading(false);
            });
    }, [id]);

    const handleSendNotification = async () => {
        try {
            const notificationData = {
                message: contactMessage,
                publicationId: id
            };
            const result = await sendNotification(notificationData);
            setSuccessMessage(result);
            localStorage.setItem(`successMessage-${id}`, result);
            setErrorMessage("");
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    if (isLoading) {
        return (
            <div className="loader-container">
                <div className="bouncing-dots">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return <div className='error-message'>Error: {errorMessage}</div>;
    }

    if (!bien) {
        return <div>Bien not found</div>;
    }

    const allImages = [bien.posterUrl[0], ...bien.posterUrl.slice(1)];

    const openModal = (index) => {
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImageIndex(0);
    };

    const nextImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
    };

    return (
        <>
            <div className="details">
                <div className="imagesContainer">
                    <div className='Principal-image'>
                        <img 
                            className="P-image" 
                            src={allImages[0]} 
                            alt="Principal Slide" 
                            onClick={() => openModal(0)} 
                        />
                    </div>
                    <div className='secondary-images'>
                        {allImages.slice(1).map((url, index) => (
                            <img 
                                key={index} 
                                className="S-image" 
                                src={url} 
                                alt={`Slide ${index + 2}`} 
                                onClick={() => openModal(index + 1)} 
                            />
                        ))}
                    </div>
                </div>

                <div className="belongInformations">
                    <h1 className='titleBelong'>{bien.titre}</h1>
                    <h1 className="price">{`${bien.prix} Fcfa`}</h1>
                    <h5 className="belongDescription">{bien.description}</h5>
                    <h5 className="description">{bien.type} - {bien.dimension} (m<sup>2</sup>)</h5>
                    <h5 className='status'>Ce bien est a : {bien.status}</h5>
                    <h4 className="localisation">Ville : {bien.localisation}</h4>

                    <div className="contactAgent">
                        <textarea 
                            name='contact' 
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                        > Contactez nous...</textarea>
                        <button 
                            onClick={handleSendNotification} 
                            disabled={!!successMessage}
                            className={successMessage ? 'sent' : ''}
                        >
                            {successMessage ? 'Message envoyé' : 'Contacter l\'agent immobilier'}
                        </button>
                    </div>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
                </div>
            </div>

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={allImages[selectedImageIndex]} alt="Full Screen" />
                    <button className="prev" onClick={prevImage}>&#10094;</button>
                    <button className="next" onClick={nextImage}>&#10095;</button>
                </div>
            )}
        </>
    );
};

export default Details;
