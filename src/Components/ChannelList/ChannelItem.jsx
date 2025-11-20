import React from 'react'
import { Link } from 'react-router'

const ChannelItem = ({ channel, workspace_id }) => {
    return (
        <div>
            <Link to={`/workspace/${workspace_id}/${channel._id}`}>
                #{channel.name}
            </Link>
        </div>
    )
}

export default ChannelItem