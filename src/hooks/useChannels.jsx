import { useState, useEffect, useCallback } from 'react'
import { getChannelList, createChannel as apiCreateChannel } from '../services/channelService'

/**
 * useChannels - hook para manejar lista de canales y creación
 * - workspaceId: id del workspace actual
 *
 * Retorna:
 * { channels, loading, error, load, createChannel }
 */
export default function useChannels(workspaceId) {
    const [channels, setChannels] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const load = useCallback(async () => {
        if (!workspaceId) {
            setChannels([])
            return
        }
        setLoading(true)
        setError(null)
        try {
            const res = await getChannelList(workspaceId)
            const list = res?.data?.channels || []
            setChannels(list)
            try { sessionStorage.setItem(`channels_${workspaceId}`, JSON.stringify(list)) } catch (e) { /* ignore */ }
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }, [workspaceId])

    useEffect(() => {
        load()
    }, [load])

    // createChannel: llama al service y recarga lista
    const createChannel = useCallback(async (channelName) => {
        if (!workspaceId) throw new Error('workspace_id requerido')
        setLoading(true)
        try {
            const resp = await apiCreateChannel(workspaceId, channelName)
            // recargar lista después de crear
            await load()
            return resp
        } catch (err) {
            throw err
        } finally {
            setLoading(false)
        }
    }, [workspaceId, load])

    return {
        channels,
        loading,
        error,
        load,
        createChannel
    }
}