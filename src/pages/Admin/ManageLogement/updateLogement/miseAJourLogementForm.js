import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateBelonging } from "../../../../components/utils/ApiFunctions";
import './miseAJourLogement.css';

const MiseAJourLogementForm = () => {
  const location = useLocation();
  const [belonging_id, setBelongingId] = useState('');

  useEffect(() => {
    if (location.state && location.state.bienId) {
      setBelongingId(location.state.bienId);
    }
  }, [location.state]);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    belongingId: belonging_id,
    name: '',
    type: '',
    dimension: '',
    localisation: '',
    prix: ''
    // status: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 6) {
      setError('Vous ne pouvez importer que 6 images au maximum.');
      setImages([]);
    } else {
      setError('');
      setImages(selectedFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('belongingId', formData.belongingId);
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('dimension', formData.dimension);
    data.append('localisation', formData.localisation);
    data.append('prix', formData.prix);
    // data.append('status', formData.status)

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      const response = await updateBelonging(data);
      alert(`Belonging with name ${response.nom} updated successfully`);
      const destination = "/admin/dashboard";
      navigate(destination, { replace: true });
    } catch (error) {
      console.error('There was an error uploading the object!', error.message);
      // Handle error, show error message to user
    }
  };

  return (
    <div className="form-Ucontainer">
      <form onSubmit={handleSubmit} className="form">
          <div className="top">
            <div className="title">
              <h2>Modification D'un Bien IMMOBILIER</h2>
              <h3>Veuillez Remplir correctement Chaque Champs</h3>
            </div>

            <div className="content">
              <div className="form-input">
                <label htmlFor="nomBatiment">Nom Du Bien :</label>
                <input
                  type="text"
                  id="nomBatiment"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="dimension">Dimension :</label>
                <input
                  id="dimension"
                  type="text"
                  name="dimension"
                  value={formData.dimension}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="Price">Prix :</label>
                <input
                  type="number"
                  id="Price"
                  name="prix"
                  value={formData.prix}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="form-select">
                <label htmlFor="type">Type :</label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">------------</option>
                  <option value="APPARTMENT">APPARTMENT</option>
                  <option value="STUDIOS">STUDIOS</option>
                  <option value="ROOM">ROOM</option>
                </select>
              </div>

              <div className="form-select">
                <label htmlFor="ville">Ville :</label>
                <select
                  id="ville"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">------------</option>
                  <option value="DOUALA">DOUALA</option>
                  <option value="YAOUNDE">YAOUNDE</option>
                  <option value="BAFOUSSAM">BAFOUSSAM</option>
                  <option value="DSCHANG">DSCHANG</option>
                  <option value="LIMBE">LIMBE</option>
                  <option value="BUEA">BUEA</option>
                  <option value="KRIBI">KRIBI</option>
                  <option value="MAROUA">MAROUA</option>
                  <option value="FOUMBAN">FOUMBAN</option>
                  <option value="NGAOUNDERE">NGAOUNDERE</option>
                </select>
              </div>

              <div className="form-input">
                <label htmlFor="image">Image :</label>
                <input
                  type="file"
                  id="image"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
                {error && <p className="error-message">{error}</p>}
              </div>
            </div>
          </div>

          <div className="bottom">
            <input type="submit" value="Valider" />
            <input type="reset" value="Annuler Formulaire" />
          </div>
      </form>
    </div>
  );
};

export default MiseAJourLogementForm;
