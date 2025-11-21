import React from "react"
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar"
import ChannelDetails from "../../Components/ChannelDetails/ChannelDetails"
import '../../styles/global.css'
import '../../styles/workspace.css'

const WorkspaceScreen = () => {
    return (
        <div className="workspace-container">
            <ChannelSidebar />
            <div className="channel-panel">
                <ChannelDetails />
            </div>
        </div>
    )
}

export default WorkspaceScreen