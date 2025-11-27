import React, { useState } from 'react'

import '../../styles/modal.css'
import { inviteMember } from '../../services/memberService'

const InviteMemberModal = ({ workspaceId, onClose, onInvited }) => {
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        const trimmed = (email || '').trim()
        if (!trimmed) {
            setError('Email requerido')
            return
        }
        setLoading(true)
        try {
            const role = isAdmin ? 'admin' : 'user'
            await inviteMember(workspaceId, trimmed, role)
            setLoading(false)
            onInvited && onInvited()
        } catch (err) {
            setLoading(false)
            setError(err?.message || 'Error al invitar')
        }
    }

    return (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="invite-modal-title">
            <div className="modal-card" role="document">
                <header className="modal-header">
                    <h3 id="invite-modal-title">Invitar a compañeros</h3>
                    <button className="modal-close" aria-label="Cerrar" onClick={onClose}>✕</button>
                </header>

                <form onSubmit={handleSubmit} className="modal-body" noValidate>
                    <label className="field">
                        <div className="field-label">Correo electrónico</div>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="ejemplo@dominio.com"
                            required
                            aria-required="true"
                        />
                    </label>

                    <div className="field">
                        <div className="field-label">Rol</div>
                        <div className="role-toggle">
                            <label className="role-checkbox">
                                <input
                                    type="checkbox"
                                    checked={isAdmin}
                                    onChange={() => setIsAdmin(prev => !prev)}
                                    aria-checked={isAdmin}
                                />
                                <span className="role-label-text">{isAdmin ? 'Admin' : 'User'}</span>
                            </label>
                            <div className="role-help">Marca la casilla si quieres darle permisos de administrador.</div>
                        </div>
                    </div>

                    {error && <div className="form-error" role="alert">{error}</div>}

                    <div className="modal-actions">
                        <button type="button" className="button" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="button primary" disabled={loading}>
                            {loading ? 'Enviando...' : 'Invitar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default InviteMemberModal