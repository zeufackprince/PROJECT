import axios from "axios"

export const api = axios.create({
	baseURL: "http://localhost:1010"
})

//Sending data with a JSON data type
export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

//Sending data with a multiform data type
export const getHeaderMul = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		'Content-Type': 'multipart/form-data'
	}
}

/* CE FICHIER EST UTILISER POUR LES REQUETE AU BACKEND/API */

/* ICI SONT TOUTE LES FUNCTION RELIER A UN UTILISATEUR */

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

//get all AGENTS 
export async function getAllAgent() {
	try {
		const result = await api.get("/api/admin/users/AGENT", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching All Agent : ${error.message}`)
	}
}


//get all users
export async function getAllUsers() {
	try {
		const result = await api.get("/api/admin/users/USER", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching All users : ${error.message}`)
	}
}

//get users by it ID
export async function getAllUsersById(userId) {
	try {
		const result = await api.get(`/api/user/get-users/${userId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching user : ${error.message}`)
	}
}

//update user information
export async function updateUser(updateUser) {
	try {
		const response = await api.put(`/api/user/update`, updateUser, {
            headers: getHeaderMul()
        })
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User update error : ${error.message}`)
		}
	}
}

//get users profile
export async function getAllUsersProfile() {
	try {
		const result = await api.get(`/api/adminuser/get-profile`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching user Profile : ${error.message}`)
	}
}

//delete users by it ID
export async function deleteUser(userId) {
	try {
		const result = await api.get(`/api/admin/delete/${userId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error deleting user : ${error.message}`)
	}
}

/*ICI SONT TOUTE LES FUNCTION RELIER AU BIEN IMMOBILIER 
LEUR PUBLICATION AINSI QUE LEUR GESTION */

/** BELONGINGS */

/*this functoin is to create new Belongings*/
export async function createNewBelonging(createBien) {
	try {
		const response = await api.post("/api/agent/create-belonging", createBien, {
            headers: getHeaderMul()
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

//update Belonging information
export async function updateBelonging(updateBelonging) {
	try {
		const response = await api.post(`/api/agent/update`, updateBelonging, {
            headers: getHeaderMul()
        })
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User update error : ${error.message}`)
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
		const result = await api.get(`/api/user/belonging-id/${bienId}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Belonging ${error.message}`)
	}
}

//get a belonging by it type(Room, appartment or studios) 
export async function getBelongingsBytype(type) {
	try {
		const result = await api.get(`/user/belongings/${type}`, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Belonging ${error.message}`)
	}
}

/** PUBLICATION */

//get all publications
export async function getAllPublication() {
	try {
		const result = await api.get("/api/user/get-all-pub")
		return result.data
	} catch (error) {
		throw new Error("Error fetching Publication")
	}
}


//get all publications
export async function getAllPubById(bienId) {
	try {
		const result = await api.get(`/api/user/get-pub-id/${bienId}`)
		return result.data
	} catch (error) {
		throw new Error("Error fetching Publication")
	}
}



// create and delete Publication


/*ICI SONT TOUTE LES FUNCTION RELIER A L'ENVOIE DES NOTIFICATION AINAI QUE A LEUR RETRAITE DE LA BD */

//get all notifications
export async function sendNotification(sendNotification) {
	try {
		const result = await api.get("/api/user/notifications/send-message", sendNotification, {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Notification : ${error.message}`)
	}
}

//get all notifications for the ADMIN
export async function getAllNotificationAdmin() {
	try {
		const result = await api.get("/api/admin/notifications/getNotification", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Notification : ${error.message}`)
	}
}

//get all notifications for the ADMIN
export async function getAllNotificationAgent() {
	try {
		const result = await api.get("/api/agent/notifications/get-by-recipientId", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching Notification : ${error.message}`)
	}
}


