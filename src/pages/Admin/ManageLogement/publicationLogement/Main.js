import React, { useState } from 'react';
import { createNewPublication } from '../../../../components/utils/ApiFunctions'; // Assurez-vous que le chemin est correct

function MainPublication() {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('ACHETER');
  const [belonging_id, setBelongingId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPublication = { titre, description, status, belonging_id };

    try {
      const response = await createNewPublication(newPublication);
      setMessage(`Publication créée avec succès : ${response.message}`);
      // Réinitialiser les champs du formulaire
      setTitre('');
      setDescription('');
      setStatus('ACHETER');
      setBelongingId('');
    } catch (error) {
      setMessage(`Erreur lors de la création de la publication : ${error.message}`);
    }
  };

  return (
    <div className='Main'>
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
          <label>Belonging ID :</label>
          <input type="text" value={belonging_id} onChange={(e) => setBelongingId(e.target.value)} required />
        </div>
        <button type="submit">Publier</button>
      </form>
    </div>
  );
}

export default MainPublication;
