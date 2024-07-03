import React, { useState } from "react"
import { loginUser } from "../utils/ApiFunctions"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"

const Login = () => {
	const [errorMessage, setErrorMessage] = useState("")
	const [login, setLogin] = useState({
		email: "",
		password: ""
	})

	const navigate = useNavigate()
	const auth = useAuth()
	const location = useLocation()
	// let redirectUrl = location.state?.path || "/"
	// let token = null
	// let Role = null

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

			const redirectUrl = role === 'ADMIN' ? '/admin' : '/';
            // navigate(destination, { replace: true });

			navigate(redirectUrl, { replace: true })
		} else {
			setErrorMessage("Invalid username or password. Please try again.")
		}
		setTimeout(() => {
			setErrorMessage("")
		}, 4000)
	}
	

	// const handleSubmit = async (e) => {
	// 		e.preventDefault()
	// 		const success = await loginUser(login)
	// 		// ... (existing code)
	// 	if (success) {
	// 		   token = success.data.token;
	// 		   Role = success.data.role;
	// 		  auth.handleLogin(token);
	// 		  const destination = Role === 'ADMIN' ? '/admin' : '/';
	// 		  navigate(destination, { replace: true });
	// 	} else {
	// 		setErrorMessage("Invalid username or password. Please try again." + token)
	// 	}
	// 	setTimeout(() => {
	// 		setErrorMessage("")
	// 	}, 4000)
	// }

	return (
		<section className="container col-6 mt-5 mb-5">
			{errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
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

				<div className="mb-3">
					<button type="submit" className="btn btn-hotel" style={{ marginRight: "10px" }}>
						Login
					</button>
					<span style={{ marginLeft: "10px" }}>
						Don't' have an account yet?<Link to={"/auth/inscription"}> Register</Link>
					</span>
				</div>
			</form>
		</section>
	)
}

export default Login



