import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getWorspaces } from "../../services/workspaceService.js";
import { Link } from "react-router";


const HomeScreen = () => {

    const { sendRequest, response, loading, error} = useFetch ()

    useEffect (
        () => {
            sendRequest (
                () => getWorspaces ()
            )
        }, 
        []
    )
    console.log(response,loading, error)
    return (
        <div>
            <h1>Lista de workspaces</h1>
            {
                loading
                    ? <span>Cargando...</span>
                    : <div>
                        {
                            response
                            &&
                            response.data.workspaces.map(
                                (workspace) => {
                                    return (
                                        <div>
                                            <h2>{workspace.workspace_name}</h2>
                                            <Link to={'/workspace/' + workspace.workspace_id}>Abrir workspace</Link>
                                        </div>
                                    )
                                }
                            )
                        }
                    </div>
            }
        </div>
    )
}

export default HomeScreen