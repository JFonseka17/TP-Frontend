import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx";

export async function   getWorkspaces() {

    const response_http = await fetch(

        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            }
        }
    )
    if (!response_http.ok) {
        throw new Error('Error al obtener la lista de workspaces')
    }
    const response = await response_http.json()
    return response
}