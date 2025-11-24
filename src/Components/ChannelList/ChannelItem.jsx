import React from 'react'
import { Link } from 'react-router'
import '../../styles/global.css'

const ChannelItem = ({ channel, workspace_id, active = false }) => {
    const to = `/workspace/${workspace_id}/${channel._id}`
    return (
        <li className="channel-item" aria-current={active ? 'page' : undefined}>
            <Link to={to} className={`channel-link${active ? ' active' : ''}`}>
                <span className="channel-hash">#</span>
                <span className="channel-name">{channel.name}</span>
            </Link>
        </li>
    )
}

export default ChannelItem