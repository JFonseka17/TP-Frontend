import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx";

export async function getWorkspaces() {

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

export async function createWorkspace(workspaceName, url_image = '') {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`
            },
            body: JSON.stringify({
                name: workspaceName,
                url_image: url_image
            })
        }
    );

    if (!response_http.ok) {
        let errMessage = `Error al crear workspace (${response_http.status})`;
        try {
            const errBody = await response_http.json();
            if (errBody && errBody.message) errMessage = errBody.message;
        } 
        catch (e) {}
        throw new Error(errMessage);
    }

    const response = await response_http.json();
    return response
}