import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { getWorspaces } from "../../services/workspaceService.js";


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
            <h1>HomeScreen</h1>
        </div>
    )
}

export default HomeScreen