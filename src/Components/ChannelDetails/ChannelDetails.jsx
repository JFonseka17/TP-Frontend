/* import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId, createMessage } from '../../services/messagesService'
import '../../styles/channel.css'

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
            <div className="channel-details">
                <header className="channel-header">
                    <h2>Canal no seleccionado</h2>
                </header>
                <div className="channel-scroll">
                    <p>Seleccioná un canal para ver los mensajes.</p>
                </div>
            </div>
        )
    }

    // Usamos los mismos nombres que devuelve el backend
    // (message_content, message_created_at, user_name, _id)
    const messages = response?.data?.messages || []

    async function handleSendMessage(e) {
        e.preventDefault()
        const content = newMessage.trim()
        if (!content) return
        try {
            // createMessage en services enviará message_content al backend
            await createMessage(workspace_id, channel_id, content)
            setNewMessage('')
            loadMessagesList()
        } catch (err) {
            console.error('Error al enviar mensaje:', err)
        }
    }

    return (
        <div className="channel-details">
            <header className="channel-header">
                <div className="title">
                    <h2>#{channel_id}</h2>
                </div>
                <div className="controls">
                    
                </div>
            </header>

            <section className="channel-scroll">
                <div className="messages-area">
                    {loading && <div className="loading">Cargando mensajes...</div>}
                    {error && <div className="error">Error al obtener mensajes</div>}

                    {!loading && !error && (
                        <ul className="messages-list" aria-live="polite">
                            {messages.map(m => (
                                <li key={m._id} className="message-row">
                                    <div className="message-avatar" aria-hidden>
                                        
                                        {m.user_name ? m.user_name.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase() : 'U'}
                                    </div>
                                    <div className="message-body">
                                        <div className="message-meta">
                                            <strong className="message-author">{m.user_name}</strong>
                                            <span className="message-time">
                                                {m.message_created_at ? new Date(m.message_created_at).toLocaleString() : ''}
                                            </span>
                                        </div>
                                        <div className="message-content">{m.message_content}</div>
                                    </div>
                                </li>
                            ))}
                            <div ref={messagesEndRef} />
                        </ul>
                    )}
                </div>
            </section>

            <footer className="message-composer">
                <form onSubmit={handleSendMessage} style={{ display:'flex', width: '100%', gap: 8 }}>
                    <textarea
                        className="composer-input"
                        rows={2}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                    <div className="composer-actions">
                        <button type="submit" className="primary-action" disabled={!newMessage.trim()}>
                            Enviar
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    )
}

export default ChannelDetails */

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId, createMessage } from '../../services/messagesService'
import { getChannelById, getChannelList } from '../../services/channelService'
import '../../styles/channel.css'

const ChannelDetails = () => {
    const { channel_id, workspace_id } = useParams()
    const { response, error, loading, sendRequest } = useFetch()
    const [newMessage, setNewMessage] = useState('')
    const [channelName, setChannelName] = useState('')
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

    // Obtener nombre del canal: intentamos endpoint por id, si falla hacemos fallback a la lista
    // Reemplaza el useEffect actual por este (usa getChannelList y evita llamar getChannelById)
    useEffect(() => {
        let mounted = true

        async function fetchChannelName() {
            if (!workspace_id || !channel_id) return
            try {
                // Primero pedimos la lista de canales (endp. que ya existe y funciona)
                const listResp = await getChannelList(workspace_id)
                const channels = listResp?.data?.channels || []
                const found = channels.find(c => String(c._id) === String(channel_id) || c._id === channel_id)
                if (mounted) {
                    setChannelName(found?.name || '')
                }
            } catch (err) {
                // Si por alguna razón la lista falla, dejamos el fallback al id
                console.error('Error obteniendo lista de canales para obtener nombre:', err)
                if (mounted) setChannelName('')
            }
        }

        fetchChannelName()
        return () => { mounted = false }
    }, [workspace_id, channel_id])

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [response])

    if (!channel_id) {
        return (
            <div className="channel-details">
                <header className="channel-header">
                    <h2>Canal no seleccionado</h2>
                </header>
                <div className="channel-scroll">
                    <div className='channel-logo-content'>
                        <div className="channel-logo" aria-hidden>
                        <img
                            alt="Slack"
                            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg"
                            title="Slack"
                        />
                        </div>
                        <p>Seleccioná un canal para ver los mensajes.</p>
                    </div>
                    
                </div>
            </div>
        )
    }

    // Usamos los mismos nombres que devuelve el backend
    // (message_content, message_created_at, user_name, _id)
    const messages = response?.data?.messages || []

    async function handleSendMessage(e) {
        e.preventDefault()
        const content = newMessage.trim()
        if (!content) return
        try {
            // createMessage en services enviará message_content al backend
            await createMessage(workspace_id, channel_id, content)
            setNewMessage('')
            loadMessagesList()
        } catch (err) {
            console.error('Error al enviar mensaje:', err)
        }
    }

    return (
        <div className="channel-details">
            <header className="channel-header">
                <div className="title">
                    <h2>#{channelName || channel_id}</h2>
                </div>
                <div className="controls">
                    {/* Puedes añadir botones de configuración, buscar, etc */}
                </div>
            </header>

            <section className="channel-scroll">
                <div className="messages-area">
                    {loading && <div className="loading">Cargando mensajes...</div>}
                    {error && <div className="error">Error al obtener mensajes</div>}

                    {!loading && !error && (
                        <ul className="messages-list" aria-live="polite">
                            {messages.map(m => (
                                <li key={m._id} className="message-row">
                                    <div className="message-avatar" aria-hidden>
                                        {/* Avatar provisional: iniciales del user_name */}
                                        {m.user_name ? m.user_name.split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase() : 'U'}
                                    </div>
                                    <div className="message-body">
                                        <div className="message-meta">
                                            <strong className="message-author">{m.user_name}</strong>
                                            <span className="message-time">
                                                {m.message_created_at ? new Date(m.message_created_at).toLocaleString() : ''}
                                            </span>
                                        </div>
                                        <div className="message-content">{m.message_content}</div>
                                    </div>
                                </li>
                            ))}
                            <div ref={messagesEndRef} />
                        </ul>
                    )}
                </div>
            </section>

            <footer className="message-composer">
                <form onSubmit={handleSendMessage} style={{ display: 'flex', width: '100%', gap: 8 }}>
                    <textarea
                        className="composer-input"
                        rows={2}
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        placeholder="Escribe un mensaje..."
                    />
                    <div className="composer-actions">
                        <button type="submit" className="primary-action" disabled={!newMessage.trim()}>
                            Enviar
                        </button>
                    </div>
                </form>
            </footer>
        </div>
    )
}

export default ChannelDetails