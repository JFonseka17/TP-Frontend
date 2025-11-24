/* import React from 'react'
import { Link, useParams } from 'react-router'

const ChannelList = ({ channel_list = [] }) => {
    // Leemos workspace_id y channel_id de la URL (si están)
    const { workspace_id, channel_id } = useParams()

    if (!Array.isArray(channel_list) || channel_list.length === 0) {
        return <div className="channel-list-empty">Aún no hay canales</div>
    }

    return (
        <ul className="channel-list" aria-label="Lista de canales">
            {channel_list.map(channel => {
                const isActive = String(channel._id) === String(channel_id)
                const to = `/workspace/${workspace_id}/${channel._id}`
                return (
                    <li key={channel._id} className="channel-item">
                        <Link
                            to={to}
                            className={`channel-link${isActive ? ' active' : ''}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <span className="channel-hash">#</span>
                            <span className="channel-name">{channel.name}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default ChannelList */

import React from 'react'
import { useParams } from 'react-router'
import ChannelItem from '../ChannelList/ChannelItem'

const ChannelList = ({ channel_list = [] }) => {
    // Leemos workspace_id y channel_id de la URL (si están)
    const { workspace_id, channel_id } = useParams()

    if (!Array.isArray(channel_list) || channel_list.length === 0) {
        return <div className="channel-list-empty">Aún no hay canales</div>
    }

    return (
        <ul className="channel-list" aria-label="Lista de canales">
            {channel_list.map((channel, idx) => {
                const idStr = channel._id || channel.id || `${channel.name}-${idx}`
                const isActive = String(idStr) === String(channel_id)
                return (
                    <ChannelItem
                        key={idStr}
                        channel={channel}
                        workspace_id={workspace_id}
                        active={isActive}
                    />
                )
            })}
        </ul>
    )
}

export default ChannelList