import React from 'react'
import { Link, useParams } from 'react-router'

const ChannelList = ({ channel_list = [] }) => {
    const { workspace_id } = useParams()

    if (!Array.isArray(channel_list) || channel_list.length === 0) {
        return <div>Aún no hay canales</div>
    }

    return (
        <div>
            {channel_list.map(channel => (
                <Link key={channel._id} to={`/workspace/${workspace_id}/${channel._id}`}>
                    #{channel.name}
                </Link>
            ))}
        </div>
    )
}

export default ChannelList