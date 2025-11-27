import React from 'react'
import { useParams } from 'react-router'
import ChannelItem from '../ChannelList/ChannelItem'
import '../../styles/global.css'

const ChannelList = ({ channel_list = [], setChannels, onDeleted }) => {

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
                        setChannels={setChannels}
                        onDeleted={onDeleted}
                    />
                )
            })}
        </ul>
    )
}

export default ChannelList