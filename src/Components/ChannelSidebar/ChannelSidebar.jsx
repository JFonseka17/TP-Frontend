/* import React, { useEffect, useContext, useState } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'
import { AuthContext } from '../../Context/AuthContext'
import InviteMemberModal from '../InviteMemberModal/InviteMemberModal'
import '../../styles/global.css'
import '../../styles/channel.css'

const ChannelSidebar = () => {
    const {
        response,
        loading,
        error,
        sendRequest
    } = useFetch()
    const { workspace_id } = useParams()

    const { onLogout } = useContext(AuthContext)

    const [isInviteOpen, setIsInviteOpen] = useState(false)

    //Responsable de cargar la lista de canales
    function loadChannelList() {
        sendRequest(
            async () => {
                return await getChannelList(workspace_id)
            }
        )
    }

    //Apenas se cargue el componente debemos intentar obtener la lista de canales, tambien se debe re-ejecutar si cambia el workspace_id
    useEffect(
        () => {
            loadChannelList()
        },
        [workspace_id] //Cada vez que cambie workspace_id re ejecutar el efecto
    )

    return (
        <aside className="channel-sidebar" role="complementary" aria-label="Canales y mensajes directos">
            <div className='channel-sidebar-left'>
                <div className='channel-sidebar-icons'>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="m3 7.649-.33.223a.75.75 0 0 1-.84-1.244l7.191-4.852a1.75 1.75 0 0 1 1.958 0l7.19 4.852a.75.75 0 1 1-.838 1.244L17 7.649v7.011c0 2.071-1.679 3.84-3.75 3.84h-6.5C4.679 18.5 3 16.731 3 14.66zM11 11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <span>Inicio</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="M7.675 6.468a4.75 4.75 0 1 1 8.807 3.441.75.75 0 0 0-.067.489l.379 1.896-1.896-.38a.75.75 0 0 0-.489.068 5 5 0 0 1-.648.273.75.75 0 1 0 .478 1.422q.314-.105.611-.242l2.753.55a.75.75 0 0 0 .882-.882l-.55-2.753A6.25 6.25 0 1 0 6.23 6.064a.75.75 0 1 0 1.445.404M6.5 8.5a5 5 0 0 0-4.57 7.03l-.415 2.073a.75.75 0 0 0 .882.882l2.074-.414A5 5 0 1 0 6.5 8.5m-3.5 5a3.5 3.5 0 1 1 1.91 3.119.75.75 0 0 0-.49-.068l-1.214.243.243-1.215a.75.75 0 0 0-.068-.488A3.5 3.5 0 0 1 3 13.5" clipRule="evenodd"></path>
                        </svg>
                        <span>Mensajes directos</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="M9.357 3.256c-.157.177-.31.504-.36 1.062l-.05.558-.55.11c-1.024.204-1.691.71-2.145 1.662-.485 1.016-.736 2.566-.752 4.857l-.002.307-.217.217-2.07 2.077c-.145.164-.193.293-.206.374a.3.3 0 0 0 .034.199c.069.12.304.321.804.321h4.665l.07.672c.034.327.17.668.4.915.214.232.536.413 1.036.413.486 0 .802-.178 1.013-.41.227-.247.362-.588.396-.916l.069-.674h4.663c.5 0 .735-.202.804-.321a.3.3 0 0 0 .034-.199c-.013-.08-.061-.21-.207-.374l-2.068-2.077-.216-.217-.002-.307c-.015-2.291-.265-3.841-.75-4.857-.455-.952-1.123-1.458-2.147-1.663l-.549-.11-.05-.557c-.052-.558-.204-.885-.36-1.062C10.503 3.1 10.31 3 10 3s-.505.1-.643.256m-1.124-.994C8.689 1.746 9.311 1.5 10 1.5s1.31.246 1.767.762c.331.374.54.85.65 1.383 1.21.369 2.104 1.136 2.686 2.357.604 1.266.859 2.989.894 5.185l1.866 1.874.012.012.011.013c.636.7.806 1.59.372 2.342-.406.705-1.223 1.072-2.103 1.072H12.77c-.128.39-.336.775-.638 1.104-.493.538-1.208.896-2.12.896-.917 0-1.638-.356-2.136-.893A3 3 0 0 1 7.23 16.5H3.843c-.88 0-1.697-.367-2.104-1.072-.433-.752-.263-1.642.373-2.342l.011-.013.012-.012 1.869-1.874c.035-2.196.29-3.919.894-5.185.582-1.22 1.475-1.988 2.684-2.357.112-.533.32-1.009.651-1.383" clipRule="evenodd"></path>
                        </svg>
                        <span>Actividad</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="M4.836 3A1.836 1.836 0 0 0 3 4.836v7.328c0 .9.646 1.647 1.5 1.805V7.836A3.336 3.336 0 0 1 7.836 4.5h6.133A1.84 1.84 0 0 0 12.164 3zM1.5 12.164a3.337 3.337 0 0 0 3.015 3.32A3.337 3.337 0 0 0 7.836 18.5h3.968c.73 0 1.43-.29 1.945-.805l3.946-3.946a2.75 2.75 0 0 0 .805-1.945V7.836a3.337 3.337 0 0 0-3.015-3.32A3.337 3.337 0 0 0 12.164 1.5H4.836A3.336 3.336 0 0 0 1.5 4.836zM7.836 6A1.836 1.836 0 0 0 6 7.836v7.328C6 16.178 6.822 17 7.836 17H11.5v-4a1.5 1.5 0 0 1 1.5-1.5h4V7.836A1.836 1.836 0 0 0 15.164 6zm8.486 7H13v3.322z" clipRule="evenodd"></path>
                        </svg>
                        <span>Archivos</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" d="M14.5 10a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-6.25 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10"></path>
                        </svg>
                        <span>Más</span>
                    </button>
                </div>

                <div className='channel-sidebar-footer'>
                    <div className="sidebar-logout">
                        <button className="sidebar-icon" aria-label="Logout" onClick={onLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                    <div className="sidebar-profile">
                        <button className="sidebar-icon" aria-label="Profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                            </svg>
                            <span>Profile</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='channel-sidebar-right'>
                <div className="team-header">
                    <div className="team-avatar">TF</div>
                    <div className="team-name">Trabajo Final</div>
                </div>

                <header className='header-content'>
                    <h3 className='header-title'>Canales</h3>
                    <span>ACA TIENE QUE IR EL BOTON PARA CREAR CANALES</span>
                </header>
                {
                    loading && <div className="channel-list-empty">Cargando...</div>
                }
                {
                    response && <ChannelList channel_list={response.data?.channels || []} />
                }
                {
                    error && <div style={{ color: 'red' }}>Error al obtener la lista de canales</div>
                }

                <div className="sidebar-footer">
                    <span>Slack funciona mejor cuando lo usas en conjunto.</span>
                    <button
                        className="fab-add"
                        aria-label="Invitar miembro"
                        onClick={() => setIsInviteOpen(true)}
                    >
                        Invitar a compañeros de equipo
                    </button>
                </div>

                {isInviteOpen && (
                    <InviteMemberModal
                        workspaceId={workspace_id}
                        onClose={() => { console.log('[DEBUG] closing invite modal'); setIsInviteOpen(false) }}
                        onInvited={() => {
                            console.log('[DEBUG] invited callback')
                            setIsInviteOpen(false)
                        }}
                    />
                )}
            </div>
        </aside>
    )
}

export default ChannelSidebar */

import React, { useContext, useState } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import { useParams } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'
import InviteMemberModal from '../InviteMemberModal/InviteMemberModal'
import useChannels from '../../hooks/useChannels'
import '../../styles/global.css'
import '../../styles/channel.css'

const ChannelSidebar = () => {
    const { workspace_id } = useParams()

    const { onLogout } = useContext(AuthContext)

    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const [creating, setCreating] = useState(false)
    // Uso del hook centralizado que obtiene la lista de canales y expone loading/error
    const { channels, loading, error, load, createChannel } = useChannels(workspace_id)

    async function handleCreateClick() {
        const name = window.prompt('Nombre del nuevo canal (sin #):')
        if (name === null) return // usuario canceló
        const trimmed = String(name).trim()
        if (!trimmed) {
            window.alert('El nombre del canal no puede estar vacío.')
            return
        }

        try {
            setCreating(true)
            await createChannel(trimmed) // createChannel viene del hook y recarga la lista internamente
            // opcional: aseguramos que la lista esté actualizada
            try { await load() } catch (e) { /* ignore */ }
            window.alert(`Canal "${trimmed}" creado correctamente.`)
        } catch (err) {
            console.error('Error creando canal:', err)
            window.alert('No se pudo crear el canal: ' + (err?.message || 'revisá la consola'))
        } finally {
            setCreating(false)
        }
    }

    return (
        <aside className="channel-sidebar" role="complementary" aria-label="Canales y mensajes directos">
            <div className='channel-sidebar-left'>
                <div className='channel-sidebar-icons'>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="m3 7.649-.33.223a.75.75 0 0 1-.84-1.244l7.191-4.852a1.75 1.75 0 0 1 1.958 0l7.19 4.852a.75.75 0 1 1-.838 1.244L17 7.649v7.011c0 2.071-1.679 3.84-3.75 3.84h-6.5C4.679 18.5 3 16.731 3 14.66zM11 11a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z" clipRule="evenodd"></path>
                        </svg>
                        <span>Inicio</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="M7.675 6.468a4.75 4.75 0 1 1 8.807 3.441.75.75 0 0 0-.067.489l.379 1.896-1.896-.38a.75.75 0 0 0-.489.068 5 5 0 0 1-.648.273.75.75 0 1 0 .478 1.422q.314-.105.611-.242l2.753.55a.75.75 0 0 0 .882-.882l-.55-2.753A6.25 6.25 0 1 0 6.23 6.064a.75.75 0 1 0 1.445.404M6.5 8.5a5 5 0 0 0-4.57 7.03l-.415 2.073a.75.75 0 0 0 .882.882l2.074-.414A5 5 0 1 0 6.5 8.5m-3.5 5a3.5 3.5 0 1 1 1.91 3.119.75.75 0 0 0-.49-.068l-1.214.243.243-1.215a.75.75 0 0 0-.068-.488A3.5 3.5 0 0 1 3 13.5" clipRule="evenodd"></path>
                        </svg>
                        <span>Mensajes</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="M9.357 3.256c-.157.177-.31.504-.36 1.062l-.05.558-.55.11c-1.024.204-1.691.71-2.145 1.662-.485 1.016-.736 2.566-.752 4.857l-.002.307-.217.217-2.07 2.077c-.145.164-.193.293-.206.374a.3.3 0 0 0 .034.199c.069.12.304.321.804.321h4.665l.07.672c.034.327.17.668.4.915.214.232.536.413 1.036.413.486 0 .802-.178 1.013-.41.227-.247.362-.588.396-.916l.069-.674h4.663c.5 0 .735-.202.804-.321a.3.3 0 0 0 .034-.199c-.013-.08-.061-.21-.207-.374l-2.068-2.077-.216-.217-.002-.307c-.015-2.291-.265-3.841-.75-4.857-.455-.952-1.123-1.458-2.147-1.663l-.549-.11-.05-.557c-.052-.558-.204-.885-.36-1.062C10.503 3.1 10.31 3 10 3s-.505.1-.643.256m-1.124-.994C8.689 1.746 9.311 1.5 10 1.5s1.31.246 1.767.762c.331.374.54.85.65 1.383 1.21.369 2.104 1.136 2.686 2.357.604 1.266.859 2.989.894 5.185l1.866 1.874.012.012.011.013c.636.7.806 1.59.372 2.342-.406.705-1.223 1.072-2.103 1.072H12.77c-.128.39-.336.775-.638 1.104-.493.538-1.208.896-2.12.896-.917 0-1.638-.356-2.136-.893A3 3 0 0 1 7.23 16.5H3.843c-.88 0-1.697-.367-2.104-1.072-.433-.752-.263-1.642.373-2.342l.011-.013.012-.012 1.869-1.874c.035-2.196.29-3.919.894-5.185.582-1.22 1.475-1.988 2.684-2.357.112-.533.32-1.009.651-1.383" clipRule="evenodd"></path>
                        </svg>
                        <span>Actividad</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" fillRule="evenodd" d="M4.836 3A1.836 1.836 0 0 0 3 4.836v7.328c0 .9.646 1.647 1.5 1.805V7.836A3.336 3.336 0 0 1 7.836 4.5h6.133A1.84 1.84 0 0 0 12.164 3zM1.5 12.164a3.337 3.337 0 0 0 3.015 3.32A3.337 3.337 0 0 0 7.836 18.5h3.968c.73 0 1.43-.29 1.945-.805l3.946-3.946a2.75 2.75 0 0 0 .805-1.945V7.836a3.337 3.337 0 0 0-3.015-3.32A3.337 3.337 0 0 0 12.164 1.5H4.836A3.336 3.336 0 0 0 1.5 4.836zM7.836 6A1.836 1.836 0 0 0 6 7.836v7.328C6 16.178 6.822 17 7.836 17H11.5v-4a1.5 1.5 0 0 1 1.5-1.5h4V7.836A1.836 1.836 0 0 0 15.164 6zm8.486 7H13v3.322z" clipRule="evenodd"></path>
                        </svg>
                        <span>Archivos</span>
                    </button>
                    <button className='sidebar-icon'>
                        <svg viewBox="0 0 20 20">
                            <path fill="currentColor" d="M14.5 10a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m-6.25 0a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10"></path>
                        </svg>
                        <span>Más</span>
                    </button>
                </div>

                <div className='channel-sidebar-footer'>
                    <div className="sidebar-logout">
                        <button className="sidebar-icon" aria-label="Logout" onClick={onLogout}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z" />
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                    <div className="sidebar-profile">
                        <button className="sidebar-icon" aria-label="Profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                            </svg>
                            <span>Profile</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className='channel-sidebar-right'>
                <div className="team-header">
                    <div className="team-avatar">TF</div>
                    <div className="team-name">Trabajo Final</div>
                </div>

                <header className='header-content'>
                    <h3 className='header-title'>Canales</h3>
                    <button type="button" aria-label="Crear canal" onClick={handleCreateClick} disabled={creating}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                        </svg>
                    </button>
                </header>

                {loading && <div className="channel-list-empty">Cargando...</div>}
                {channels && <ChannelList channel_list={channels || []} />}
                {error && <div style={{ color: 'red' }}>Error al obtener la lista de canales</div>}

                <div className="sidebar-footer">
                    <span>Slack funciona mejor cuando lo usas en conjunto.</span>
                    <button
                        aria-label="Invitar miembro"
                        onClick={() => setIsInviteOpen(true)}
                    >
                        Invitar a compañeros de equipo
                    </button>
                </div>

                {isInviteOpen && (
                    <InviteMemberModal
                        workspaceId={workspace_id}
                        onClose={() => { console.log('[DEBUG] closing invite modal'); setIsInviteOpen(false) }}
                        onInvited={() => {
                            console.log('[DEBUG] invited callback')
                            setIsInviteOpen(false)
                        }}
                    />
                )}
            </div>
        </aside>
    )
}

export default ChannelSidebar