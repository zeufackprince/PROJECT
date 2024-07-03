import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:1010"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/*CE FICHIER EST UTILISER POUR LES REQUETE AU BACKEND/API*/

/*ICI SONT TOUTE LES FUNCTION RELIER A UN UTILISATEUR */

/* This function register a new user */
export async function registerUser(registration) {
	try {
		const response = await api.post("/auth/register", registration, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}


/* This function login a registered user */
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
			console.log(response)
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*ICI SONT TOUTE LES FUNCTION RELIER AU BIEN IMMOBILIER */

/*this functoin is to create new Belongings*/
export async function createNewBelonging(createBien) {
	try {
		const response = await api.post("/api/agent/create-belonging", createBien, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Erreur lors de la creation du Bien Immobilier : ${error.message}`)
		}
	}
}


/* This function gets all Belongings from the database */
export async function getAllBelongings() {
	try {
		const result = await api.get("/api/user/get-All-Belongings")
		return result.data
	} catch (error) {
		throw new Error("Error fetching Belongings")
	}
}

//get a belonging by it Id 
export async function getBelongingsById(bienId) {
	try {
		const result = await api.get(`/api/user/belonging-id/${bienId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Belonging ${error.message}`)
	}
}

//get all publications
export async function getAllPublication() {
	try {
		const result = await api.get("/api/user/get-all-pub")
		return result.data
	} catch (error) {
		throw new Error("Error fetching Publication")
	}
}
