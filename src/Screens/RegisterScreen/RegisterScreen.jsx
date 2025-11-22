import React, { useState } from "react";
import useForm from "../../hooks/useforms";
import { register } from "../../services/authService";
import useFetch from "../../hooks/useFetch";
import '../../styles/register.css';

const RegisterScreen = () => {

    const REGISTER_FORM_FIELDS = {
        USERNAME: 'username',
        EMAIL: 'email',
        PASSWORD: 'password'
    }

    const initial_form_state = {
        [REGISTER_FORM_FIELDS.USERNAME]: '',
        [REGISTER_FORM_FIELDS.EMAIL]: '',
        [REGISTER_FORM_FIELDS.PASSWORD]: ''
    }

    const { response, error, loading, sendRequest, resetResponse } = useFetch();

    // ojo: añadí showPassword para el ojito y resetResponse para limpiar errores antes de enviar
    const [showPassword, setShowPassword] = useState(false);

    function onRegister(form_state_sent) {
        // protección mínima: evitar doble envío si ya loading
        if (loading) return;
        resetResponse();
        sendRequest(
            () => {
                return register(
                    form_state_sent[REGISTER_FORM_FIELDS.USERNAME],
                    form_state_sent[REGISTER_FORM_FIELDS.EMAIL],
                    form_state_sent[REGISTER_FORM_FIELDS.PASSWORD]
                )
            }
        )
    }

    const {
        form_state,
        onInputChange,
        handleSubmit,
        resetForm
    } = useForm(
        initial_form_state,
        onRegister
    )

    const nameVal = form_state[REGISTER_FORM_FIELDS.USERNAME] || '';
    const emailVal = form_state[REGISTER_FORM_FIELDS.EMAIL] || '';
    const passVal = form_state[REGISTER_FORM_FIELDS.PASSWORD] || '';

    return (
        <div className="register-page">
            <div className="register-wrapper">
                <div className="register-top" role="banner">
                    <div className="space-left" />         {/* spacer para equilibrar la grilla */}
                    <div className="logo" aria-hidden>    {/* logo queda en la columna central */}
                        <img alt="Slack" src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" />
                    </div>
                    <div className="top-right">           {/* contenido en columna y alineado a la derecha */}
                        <div className="top-question">¿Ya tienes una cuenta?</div>
                        <div className="top-action">
                            <a className="small-link" href="/login">Inicia sesión</a>
                        </div>
                    </div>
                </div>

                <div className="register-heading">
                    <h1>Registrate</h1>
                    <p>Crea tu cuenta con nombre, email y contraseña</p>
                </div>

                <div className="register-card">
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-field">
                            <label htmlFor="username">Nombre de usuario</label>
                            <input
                                type="text"
                                placeholder="pepe"
                                value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                                name={REGISTER_FORM_FIELDS.USERNAME}
                                id='username'
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="pepe@gmail.com"
                                value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                                name={REGISTER_FORM_FIELDS.EMAIL}
                                id='email'
                                onChange={onInputChange}
                                required
                            />
                        </div>

                        <div className="form-field password-wrapper">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="pepe-123"
                                value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                                name={REGISTER_FORM_FIELDS.PASSWORD}
                                id='password'
                                onChange={onInputChange}
                                required
                                aria-describedby="toggle-password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(s => !s)}
                                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                aria-pressed={showPassword}
                                id="toggle-password"
                                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                            >
                                {showPassword ? (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M3 3L21 21" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M10.58 10.58C10.21 10.92 10 11.41 10 11.94C10 13.16 11.02 14.18 12.24 14.18C12.77 14.18 13.26 13.97 13.6 13.6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17.94 17.94C16.36 19.08 14.26 19.75 12 19.75C6.7 19.75 2.41 16.06 1 12C1.7 10.03 3.1 8.3 5.05 7.03" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                ) : (
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M2.5 12C3.91 16.06 8.2 19.75 13.5 19.75C15.76 19.75 17.86 19.08 19.44 17.94" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21.5 12C20.09 7.94 15.8 4.25 10.5 4.25C8.24 4.25 6.14 4.92 4.56 6.06" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        <div className="register-feedback" id="register-feedback">
                            {error && <div className="error">{error}</div>}
                            {response && response.ok && <div className="success">Usuario registrado con éxito</div>}
                        </div>

                        <button
                            className="primary-action"
                            type="submit"
                            disabled={loading || !nameVal.trim() || !emailVal.trim() || !passVal.trim()}
                        >
                            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                        </button>
                    </form>
                </div>

                <div className="register-footer">
                    Al registrarte aceptas los términos y condiciones.
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen