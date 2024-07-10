import React, { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../utils/ApiFunctions";
import { Link, useNavigate } from "react-router-dom";
import './Registration.css'


const Registration = () => {

    const navigate = useNavigate();
    

    
        const [registration, setRegistration] = useState({
            name: "",
            email: "",
            password: "",
            telephone: 0, // Initialize as null or 0
            file: null,  // Handle file input
            role: ""
        });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "file") {
            setRegistration({ ...registration, [name]: files[0] });  // Handle file input
        } else {
            setRegistration({ ...registration, [name]: value });
        }
    };

    const generateRandomFileName = (originalFileName) => {
        const extension = originalFileName.split('.').pop();
        const randomName = Math.random().toString(36).substring(2, 15) + '-' + Date.now();
        return `${randomName}.${extension}`;
    };

    const isCameroonianPhoneNumber = (phone) => {
        const cameroonPhoneRegex = /^2376[0-9]{8}$/; 
        return cameroonPhoneRegex.test(phone);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (!isCameroonianPhoneNumber(registration.telephone)) {
            setErrorMessage("Please enter a valid Cameroonian phone number.");
            return;
        }

        const formData = new FormData();
        formData.append("name", registration.name);
        formData.append("email", registration.email);
        formData.append("password", registration.password);
        formData.append("telephone", registration.telephone);

        // Check if a file is selected, if not, append the default file with a unique name
        if (!registration.file) {
            const defaultFile = await fetch('/images/default-profile.png')
                .then(res => res.blob())
                .then(blob => {
                    const uniqueFileName = generateRandomFileName('default-profile.png');
                    return new File([blob], uniqueFileName, { type: 'image/png' });
                });
            formData.append("file", defaultFile);
        } else {
            formData.append("file", registration.file);
        }

        // formData.append("role", registration.role);

        try {
            const result = await registerUser(formData);
            setSuccessMessage(result.statusCode);
            setErrorMessage("");
            setRegistration({ name: "", email: "", password: "", telephone: 0, file: null, role: "" });

            // Redirect to login page after successful registration
            const destination = "/auth/login"
            navigate(destination, { replace: true });
        } catch (error) {
            setSuccessMessage("");
            setErrorMessage(`Registration error: ${error.message}`);
        }
        setTimeout(() => {
            setErrorMessage("");
            setSuccessMessage("");
        }, 5000);
    };

    return (
        <section className="container col-6 mt-5 mb-5">
            {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            {successMessage && <p className="alert alert-success">{successMessage}</p>}

            <h2>Register</h2>
            <form onSubmit={handleRegistration} encType="multipart/form-data"   >
                
                <div className="mb-3 row">
                    <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input
                            id="name"
                            name="namee"
                            type="text"
                            className="form-control"
                            value={registration.name}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-control"
                            value={registration.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={registration.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label htmlFor="telephone" className="col-sm-2 col-form-label">Contact</label>
                    <div className="col-sm-10">
                        <input
                            id="telephone"
                            name="telephone"
                            type="number"
                            className="form-control"
                            placeholder="6"
                            value={registration.telephone}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* <div className="mb-3 row">
                    <label htmlFor="role" className="col-sm-2 col-form-label">Role</label>
                    <div className="col-sm-10">
                        <input
                            id="role"
                            name="role"
                            type="text"
                            className="form-control"
                            value={registration.role}
                            onChange={handleInputChange}
                        />
                    </div>
                </div> */}

                <div className="mb-3 row">
                    <label htmlFor="file" className="col-sm-2 col-form-label">Profile file</label>
                    <div className="col-sm-10">
                        <input
                            id="file"
                            name="file"
                            type="file"
                            className="form-control"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
                        Register
                    </button>
                    <span style={{ marginLeft: "10px" }}>
                        Already have an account? <Link to={"/auth/login"}>Login</Link>
                    </span>
                </div>
            </form>

 

        </section>
    );
};

export default Registration;
