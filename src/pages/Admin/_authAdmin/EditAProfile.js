import React, { useState, useEffect } from 'react';
import './editAProfile.css';
import userPlaceholder from '../../UserProfile/profilImages/avatar.svg';
import { Link, useNavigate } from 'react-router-dom';
import { updateUser, getAllUsersProfile } from '../../../components/utils/ApiFunctions';  // Adjust the import according to your project structure

const EditAProfile = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    posterUrl: userPlaceholder,
    file: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getAllUsersProfile();
        setUserProfile(profile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        posterUrl: reader.result,
        file: file,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {};
    const phoneRegex = /^(67|68|65|69)\d{7}$/;

    if (userProfile.password !== userProfile.confirmPassword) {
      errors.password = 'Passwords do not match';
    }
    if (!phoneRegex.test(userProfile.telephone)) {
      errors.telephone = 'Invalid Cameroonian phone number';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('name', userProfile.name);
    formData.append('password', userProfile.password);
    formData.append('telephone', userProfile.telephone);
    formData.append('email', userProfile.email);
    if (userProfile.file) {
      formData.append('file', userProfile.file);
    }

    try {
      await updateUser(formData);
      alert('User updated successfully');
      navigate('/');  // Redirect to profile page or another page
    } catch (error) {
      console.error('User update error:', error);
      alert(`User update error: ${error.message}`);
    }
  };

  return (
    <>
      <h1>Editer le profil utilisateur</h1>
      <div className='userProfile'>
        <div className='editProfilContainer'>
          <div className='profileImg'>
            <img src={userProfile.posterUrl} alt='User profile' className='imgProfile' />
          </div>

          <form className='editProfile' onSubmit={handleSubmit}>
            <input
              type='text'
              name='name'
              placeholder='Noms'
              value={userProfile.name}
              onChange={handleInputChange}
              required
            />
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={userProfile.email}
              onChange={handleInputChange}
              required
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={userProfile.password}
              onChange={handleInputChange}
            />
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={userProfile.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.password && <p className='error'>{errors.password}</p>}
            <input
              type='text'
              name='telephone'
              placeholder='telephone'
              value={userProfile.telephone}
              onChange={handleInputChange}
            />
            {errors.telephone && <p className='error'>{errors.telephone}</p>}
            <input type='file' accept='image/*' onChange={handleFileChange} />

            <div className='buttonProfile'>
              <input type='submit' value='Modifier' className='editprofBtn' />
              <Link to='/' className='editprofBtn'>Annuler</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAProfile;
