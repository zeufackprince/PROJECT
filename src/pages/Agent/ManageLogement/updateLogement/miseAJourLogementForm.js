import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateBelonging } from "../../../../components/utils/ApiFunctions";

const MiseAJourLogementForm = () => {
  const { id } = useParams(); // Get bienId from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    dimension: '',
    localisation: '',
    prix: ''
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('id', id); // Include the ID in the form data
    data.append('name', formData.name);
    data.append('type', formData.type);
    data.append('dimension', formData.dimension);
    data.append('localisation', formData.localisation);
    data.append('prix', formData.prix);

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    try {
      const response = await updateBelonging(data);
      alert(`Belonging with name ${response.nom} updated successfully`);
      const destination = "/agent/dashboard";
      navigate(destination, { replace: true });
    } catch (error) {
      console.error('There was an error updating the object!', error.message);
      // Handle error, show error message to user
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div className="top">
            <div className="title">
              <h2>Modification d'un Bien Immobilier</h2>
              <h3>Veuillez remplir correctement chaque champ</h3>
            </div>

            <div className="content">

            <div className="form-input">
                <label htmlFor="id">Id :</label>
                <input
                  type=""
                  id="nomBatiment"
                  name="id"
                  placeholder={id}
                  value={id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="nomBatiment">Nom Du Bien :</label>
                <input
                  type="text"
                  id="nomBatiment"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-input">
                <label htmlFor="Dimension">Dimension :</label>
                <input
                  id="disponibilite"
                  type="text"
                  name="dimension"
                  value={formData.dimension}
                  onChange={handleChange}
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
                  required
                >
                  <option value="">------------</option>
                  <option value="APPARTMENT">APPARTMENT</option>
                  <option value="STUDIOS">STUDIOS</option>
                  <option value="ROOM">ROOM</option>
                </select>
              </div>

              <div className="form-select">
                <label htmlFor="ville/Localisation">Ville :</label>
                <select
                  id="ville"
                  name="localisation"
                  value={formData.localisation}
                  onChange={handleChange}
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

              {/* <div className="form-select">
                <label htmlFor="status">Status :</label>
                <select
                  id=""
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">------------</option>
                  <option value="ACHETER">A Vendre</option>
                  <option value="LOUER">A Louer</option>
                </select>
              </div> */}

              <div className="form-input">
                <label htmlFor="image">Image :</label>
                <input
                  type="file"
                  id="image"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="bottom">
            <input type="submit" value="Valider" />
            <input type="reset" value="Annuler Formulaire" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default MiseAJourLogementForm;
