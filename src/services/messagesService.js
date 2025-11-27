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
    // devolvemos la respuesta tal cual (campos del backend)
    return response;
}

// POST /api/workspace/:workspace_id/channels/:channel_id/messages
// Envío con el mismo campo que usa el backend: message_content
export async function createMessage(workspace_id, channel_id, content) {
    const url = `${ENVIRONMENT.URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`;

    const response_http = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content })
    });

    const response = await response_http.json();
    if (!response.ok) {
        throw new Error(response.message || "Error al crear el mensaje");
    }
    return response;
}

export async function deleteMessage(workspaceId, channelId, messageId) {
    const url = `${ENVIRONMENT.URL_API}/api/workspace/${workspaceId}/channels/${channelId}/messages/${messageId}`

    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        }
    })

    if (res.status === 204) return true

    const body = await res.text().catch(() => '')
    const err = new Error(`Delete failed: ${res.status} ${res.statusText} ${body}`)
    err.status = res.status
    err.body = body
    throw err
}