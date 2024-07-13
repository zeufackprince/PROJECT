import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import './Login.css'
import agenceImg from '../../images/agence-immo.jpg'

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	

	const handleInputChange = (e) => {
		setLogin({ ...login, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const success = await loginUser(login)
		if (success) {
			const token = success.token
			const role = success.role
			auth.handleLogin(token, role)

			let redirectUrl = ''
			if(role === 'ADMIN'){
				redirectUrl = '/admin'
			}else if(role === 'AGENT'){
				redirectUrl = '/agent'
			}else{
				redirectUrl = '/'
			}

			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}
	

	return (
		<section className="auth-container">
			
			<div className="auth-form">
				<div className="auth-image">
					<img src={agenceImg} alt="illustration agence immobiliere"/>
				</div>
				<form onSubmit={handleSubmit}>
					{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
					<h2>Connexion</h2>
					<div className="row mb-3">
						<label htmlFor="email" className="col-sm-2 col-form-label">
							Email
						</label>
						<div>
							<input
								id="email"
								name="email"
								type="email"
								className="form-control"
								value={login.email}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="row mb-3">
						<label htmlFor="password" className="col-sm-2 col-form-label">
							Password
						</label>
						<div>
							<input
								id="password"
								name="password"
								type="password"
								className="form-control"
								value={login.password}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="auth-btns">
						<button type="submit" className="btn btn-hotel" >
							Login
						</button>
						<span style={{ marginLeft: "10px" }}>
							Vous n'avez pas de compte ?<Link to={"/auth/inscription"}> S'inscrire</Link>
						</span>
					</div>
				</form>
			</div>
			
		</section>
	)
}

export default Login



