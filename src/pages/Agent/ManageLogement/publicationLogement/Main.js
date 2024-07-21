import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { createNewPublication } from '../../../../components/utils/ApiFunctions'; // Assurez-vous que le chemin est correct

function MainPublication() {
  const location = useLocation();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [belonging_id, setBelongingId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state && location.state.bienId) {
      setBelongingId(location.state.bienId);
    }
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPublication = { titre, description, status, belonging_id };

    try {
      const response = await createNewPublication(newPublication);
      setMessage(`Publication créée avec succès : ${response.message}`);
      // Réinitialiser les champs du formulaire
      setTitre('');
      setDescription('');
      setStatus('');
      setBelongingId('');
    } catch (error) {
      setMessage(`Erreur lors de la création de la publication : ${error.message}`);
    }
  };

  return (
    <div className='publish-belong-cont'>
      <h1>Créer une nouvelle publication</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre :</label>
          <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
        </div>
        <div>
          <label>Description :</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required cols={60} rows={10}></textarea>
        </div>
        <div>
          <label>Status :</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ACHETER">ACHETER</option>
            <option value="LOUER">LOUER</option>
          </select>
        </div>
        <div>
          <input type="text" value={belonging_id} onChange={(e) => setBelongingId(e.target.value)} required readOnly />
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
}

export default MainPublication;
