import React from 'react'
import { Link } from 'react-router'
import { deleteChannel } from '../../services/channelService'
import '../../styles/global.css'

const ChannelItem = ({ channel, workspace_id, active = false, setChannels, onDeleted, onSelect }) => {
    const to = `/workspace/${workspace_id}/${channel._id}`

    const handleDelete = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        try {
            await deleteChannel(workspace_id, channel._id)
            if (typeof setChannels === 'function') {
                setChannels(prev => prev.filter(c => String(c._id) !== String(channel._id)))
            }
            if (typeof onDeleted === 'function') onDeleted(channel._id)
            if (typeof onSelect === 'function') onSelect(null)
        } catch (err) {
            console.error('No se pudo eliminar el canal:', err)
        }
    }

    return (
        <li className="channel-item" aria-current={active ? 'page' : undefined}>
            <Link to={to} className={`channel-link${active ? ' active' : ''}`}>
                <span className="channel-hash">#</span>
                <span className="channel-name">{channel.name}</span>
            </Link>
            <button
                onClick={handleDelete}
                aria-label={`Eliminar canal ${channel.name}`}
                title="Eliminar canal"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6 }}
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 6h18" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 11v6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 11v6" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </li>
    )
}

export default ChannelItem