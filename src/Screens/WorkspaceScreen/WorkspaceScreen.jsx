import React from "react"
import ChannelSidebar from "../../Components/ChannelSidebar/ChannelSidebar"
import ChannelDetails from "../../Components/ChannelDetails/ChannelDetails"
import ChannelSearch from "../../Components/ChannelSearch/ChannelSearch"
import '../../styles/global.css'
import '../../styles/workspace.css'


const WorkspaceScreen = () => {
    return (
        <div className="workspace-container">
            <div className="channel-search-container">
                <ChannelSearch />
            </div>
            <div className="channel-main-container">
                <ChannelSidebar />
                <div className="channel-panel">
                    <ChannelDetails />
                </div>
            </div>
        </div>
    )
}

export default WorkspaceScreen