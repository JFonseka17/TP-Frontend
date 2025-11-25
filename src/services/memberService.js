import ENVIRONMENT from "../config/environment.js";
import { AUTH_TOKEN_KEY } from "../Context/AuthContext.jsx";

/**
 * inviteMember - llama al endpoint de backend que crea una invitación
 * Body: { email, role }
 * Endpoint esperado (según backend leído): POST /api/workspace/:workspaceId/invite
 *
 * Uso:
 * import { inviteMember } from '../services/memberService'
 * await inviteMember(workspaceId, 'user@example.com', 'admin')
 */
export async function inviteMember(workspaceId, email, role = 'user') {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    const res = await fetch(`${ENVIRONMENT.URL_API}/api/workspace/${workspaceId}/invite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, role })
    });

    if (!res.ok) {
        // Intenta leer el body para obtener un mensaje útil
        let text = null;
        try { text = await res.text(); } catch (e) { /* ignore */ }

        // Si el body es JSON con message, úsalo
        if (text) {
            try {
                const json = JSON.parse(text);
                throw new Error(json?.message || `Error al invitar (${res.status})`);
            } catch {
                throw new Error(text || `Error al invitar (${res.status})`);
            }
        }

        throw new Error(`Error al invitar (${res.status})`);
    }

    return res.json();
}