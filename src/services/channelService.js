import ENVIRONMENT from "../config/environment.js"
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx"

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

async function getChannelById(workspace_id, channel_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels/${channel_id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            },
        }
    )
    const response = await response_http.json()
    if (!response.ok) {
        throw new Error("Error at get channel by id");
    }
    return response
}

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

async function deleteChannel(workspaceId, channelId, token) {
    const url = `${ENVIRONMENT.URL_API}/api/workspace/${workspaceId}/channels/${channelId}`


    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_KEY)}`,
            'Content-Type': 'application/json'
        }
    })

    if (res.status === 204) return true

    const body = await res.text().catch(() => '')
    const err = new Error(`Delete channel failed: ${res.status} ${res.statusText} ${body}`)
    err.status = res.status
    err.body = body
    throw err
}

export { getChannelList, createChannel, getChannelById, deleteChannel }