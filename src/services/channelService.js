import ENVIRONMENT from "../config/environment.js"
import {AUTH_TOKEN_KEY} from "../Context/AuthContext.jsx"

//GET /api/workspaces/:workspace_id/channels
//Obtiene la lista de canales de un workspace
async function getChannelList(workspace_id) {

    console.log(localStorage.getItem(AUTH_TOKEN_KEY))
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            },
        }
    )
    const response = await response_http.json()
    if (!response.ok) {
        throw new Error("Error at get channels");
    }
    return response
}


//POST /api/workspaces/:workspace_id/channels

//Crea un nuevo canal
//Debes pasar por body el name
//body example: { name: "general" }
async function createChannel(workspace_id, channel_name) {
    const body = {
        name: channel_name
    }

    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            },
            body: JSON.stringify(body)
        }
    )

    const response = await response_http.json()
    if (!response.ok) {
        throw new Error("Error at create channel");
    }
    return response
}

export { getChannelList, createChannel }