/* import React, { useEffect } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'

const ChannelSidebar = () => {
    const {
        response, 
        loading, 
        error, 
        sendRequest
    } = useFetch()
    const {workspace_id} = useParams()
    console.log(workspace_id)
    //Responsable de cargar la lista de canales
    function loadChannelList (){
        sendRequest(
            async () => {
                return await getChannelList( workspace_id )
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

    console.log(response, error, loading)

    return (
        <aside className="channel-sidebar">
            <header>
                <h3>Canales</h3>
            </header>
            {
                loading && <span>Cargando...</span>
            }
            {
                response && <ChannelList channel_list={response.data.channels}/>
            }
            {
                error && <span style={{color: 'red'}}>Error al obtener la lista de canales</span>
            }
        </aside>
    )
}

export default ChannelSidebar */

import React, { useEffect } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'

const ChannelSidebar = () => {
    const {
        response, 
        loading, 
        error, 
        sendRequest
    } = useFetch()
    const {workspace_id} = useParams()

    //Responsable de cargar la lista de canales
    function loadChannelList (){
        sendRequest(
            async () => {
                return await getChannelList( workspace_id )
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
            <div className="team-header">
                <div className="team-avatar">TF</div>
                <div className="team-name">Trabajo Final</div>
            </div>

            <header>
                <h3>Canales</h3>
            </header>
            {
                loading && <div className="channel-list-empty">Cargando...</div>
            }
            {
                response && <ChannelList channel_list={response.data?.channels || []}/>
            }
            {
                error && <div style={{color: 'red'}}>Error al obtener la lista de canales</div>
            }

            <div className="sidebar-footer">
                <button className="fab-add" aria-label="Crear canal">+</button>
            </div>
        </aside>
    )
}

export default ChannelSidebar