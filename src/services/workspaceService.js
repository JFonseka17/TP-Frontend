import ENVIRONMENT from "../config/environment.js";

export async function   getWorspaces() {

    const response_http = await fetch(

        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if (!response_http.ok) {
        throw new Error('Error al obtener la lista de workspaces')
    }
    const response = await response_http.json()
    return response
}