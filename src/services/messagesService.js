import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx";

// GET /api/workspace/:workspace_id/channels/:channel_id/messages
export async function getMessagesByChannelId(workspace_id, channel_id) {
    const url = `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`;
    const response_http = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            "Content-Type": "application/json"
        }
    });

    const response = await response_http.json();
    if (!response.ok) {
        throw new Error(response.message || "Error al obtener los mensajes");
    }
    return response;
}

// POST /api/workspace/:workspace_id/channels/:channel_id/messages
export async function createMessage(workspace_id, channel_id, content) {
    const url = `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`;
    const body = { content };
    const response_http = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const response = await response_http.json();
    if (!response.ok) {
        throw new Error(response.message || "Error al crear el mensaje");
    }
    return response;
}