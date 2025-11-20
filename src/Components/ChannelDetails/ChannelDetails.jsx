import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId, createMessage } from '../../services/messagesService'

const ChannelDetails = () => {
    const { channel_id, workspace_id } = useParams()
    const { response, error, loading, sendRequest } = useFetch()
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef(null)

    function loadMessagesList() {
        if (!workspace_id || !channel_id) return
        sendRequest(async () => {
            return await getMessagesByChannelId(workspace_id, channel_id)
        })
    }

    useEffect(() => {
        if (!channel_id) return
        loadMessagesList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel_id, workspace_id])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [response])

    if (!channel_id) {
        return (
            <div>
                <span>Canal no seleccionado</span>
            </div>
        )
    }

    const messages = response?.data?.messages || response?.messages || []

    async function handleSendMessage(e) {
        e.preventDefault()
        const content = newMessage.trim()
        if (!content) return
        try {
            await createMessage(workspace_id, channel_id, content)
            setNewMessage('')
            loadMessagesList()
        } catch (err) {
            console.error('Error al enviar mensaje:', err)
        }
    }

    return (
        <div>
            <header>
                <h4>Canal: {channel_id}</h4>
            </header>

            <section>
                {loading && <div>Cargando mensajes...</div>}
                {error && <div>Error al obtener mensajes</div>}

                {!loading && !error && (
                    <ul>
                        {messages.map(m => (
                            <li key={m._id}>
                                <div>
                                    <strong>{m.name || m.member?.name || m.author}</strong>
                                    <span>
                                        {m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}
                                    </span>
                                </div>
                                <div>{m.content}</div>
                            </li>
                        ))}
                        <div ref={messagesEndRef} />
                    </ul>
                )}
            </section>

            <footer>
                <form onSubmit={handleSendMessage}>
                    <textarea
                        rows={2}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                    <div>
                        <button type="submit" disabled={!newMessage.trim()}>
                            Enviar
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    )
}

export default ChannelDetails