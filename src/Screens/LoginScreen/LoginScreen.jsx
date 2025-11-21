import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { login } from "../../services/authService";
import useForm from "../../hooks/useforms";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../Context/AuthContext";
import '../../styles/login.css';

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const from = query.get('from');
    if (from === 'verified_email') {
      alert('Has validado tu mail exitosamente');
    }
  }, [location]);

  const LOGIN_FORM_FIELDS = { EMAIL: 'email', PASSWORD: 'password' };
  const initial_form_state = { [LOGIN_FORM_FIELDS.EMAIL]: '', [LOGIN_FORM_FIELDS.PASSWORD]: '' };

  const { response, error, loading, sendRequest, resetResponse } = useFetch();

  function handleLogin(form_state_sent) {
    resetResponse();
    sendRequest(() => login(
      form_state_sent[LOGIN_FORM_FIELDS.EMAIL],
      form_state_sent[LOGIN_FORM_FIELDS.PASSWORD]
    ));
  }

  const { form_state, onInputChange, handleSubmit } = useForm(initial_form_state, handleLogin);

  useEffect(() => {
    if (response && response.ok) {
      onLogin(response.body?.auth_token || response.data?.auth_token);
    }
  }, [response, onLogin]);

  const emailValue = form_state[LOGIN_FORM_FIELDS.EMAIL] || '';
  const passwordValue = form_state[LOGIN_FORM_FIELDS.PASSWORD] || '';

  function toggleShowPassword() {
    setShowPassword(v => !v);
  }

  return (
    <div className="login-page">
      <div className="login-wrapper">
        <div className="login-top" role="banner">
          <div className="space-left" />
          <div className="logo" aria-hidden>
            <img
              alt="Slack"
              src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg"
              title="Slack"
            />
          </div>
          <div>
            <a className="top-link" href="/register">¿Es tu primera vez en Slack? Crear una cuenta</a>
          </div>
        </div>

        <div className="login-heading" role="heading" aria-level={1}>
          <h1>Escribe tu correo electrónico para iniciar sesión</h1>
          <p>O elige otra manera de iniciar sesión.</p>
        </div>

        <div className="login-card" role="main">
          <form onSubmit={handleSubmit} className="login-form" aria-describedby="form-feedback">
            <div className="input-control">
              <input
                type="email"
                placeholder="nombre@work-email.com"
                value={emailValue}
                name={LOGIN_FORM_FIELDS.EMAIL}
                onChange={onInputChange}
                id="email"
                required
              />
            </div>

            <div className="input-control password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                value={passwordValue}
                name={LOGIN_FORM_FIELDS.PASSWORD}
                onChange={onInputChange}
                id="password"
                required
                aria-describedby="toggle-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={toggleShowPassword}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                aria-pressed={showPassword}
                id="toggle-password"
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M3 3L21 21" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.58 10.58C10.21 10.92 10 11.41 10 11.94C10 13.16 11.02 14.18 12.24 14.18C12.77 14.18 13.26 13.97 13.6 13.6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.94 17.94C16.36 19.08 14.26 19.75 12 19.75C6.7 19.75 2.41 16.06 1 12C1.7 10.03 3.1 8.3 5.05 7.03" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M2.5 12C3.91 16.06 8.2 19.75 13.5 19.75C15.76 19.75 17.86 19.08 19.44 17.94" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21.5 12C20.09 7.94 15.8 4.25 10.5 4.25C8.24 4.25 6.14 4.92 4.56 6.06" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </div>

            <button
              className="primary-action"
              type="submit"
              disabled={loading || !emailValue.trim() || !passwordValue.trim()}
            >
              {loading ? 'Conectando...' : 'Conectarse a través del correo electrónico'}
            </button>

            <div className="sep" aria-hidden>O INICIAR SESIÓN CON</div>

            <div className="social-row" role="group" aria-label="Iniciar sesión con">
              <button type="button" className="social-btn" onClick={() => alert('Simular OAuth Google')}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="c-third_party_auth__icon"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path></g></svg>
                Google
              </button>
              <button type="button" className="social-btn" onClick={() => alert('Simular OAuth Apple')}>
                <svg className="c-third_party_auth__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10.16 -2.38419e-07C7.8 0.56 6.9 2.1 6.86 4.14C7.76 4.06 8.27 3.96 8.99 3.23C9.84 2.37 10.22 1.26 10.22 0.43C10.22 0.219999 10.2 0.129999 10.16 -2.38419e-07ZM10.33 3.84C9.86 3.84 9.28 3.95 8.59 4.19C7.94 4.42 7.46 4.54 7.16 4.54C6.92 4.54 6.46 4.43 5.77 4.23C5.07 4.03 4.47 3.92 3.99 3.92C1.69 3.92 1.19209e-07 6.11 1.19209e-07 9.22C1.19209e-07 10.86 0.49 12.58 1.48 14.35C2.47 16.12 3.49 17 4.5 17C4.84 17 5.29 16.89 5.83 16.65C6.36 16.41 6.84 16.32 7.26 16.32C7.69 16.32 8.2 16.43 8.77 16.64C9.39 16.87 9.85 17 10.18 17C11.9 17 13.48 14.12 14 12.41C12.8 12.05 11.72 10.53 11.72 8.85C11.72 7.3 12.46 6.44 13.52 5.53C12.82 4.66 11.93 3.84 10.33 3.84Z" fill="#1D1C1D"></path></svg>
                Apple
              </button>
            </div>

            <div id="form-feedback" style={{ marginTop: 12 }}>
              {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
              {response && response.ok && <div style={{ color: '#1f9d55' }}>Correo enviado / Sesión iniciada</div>}
            </div>

            <div className="helper" style={{ marginTop: 8 }}>
              ¿Tienes problemas? <a href="#" onClick={(e) => e.preventDefault()}>Intenta introducir la URL de un espacio de trabajo</a>
            </div>
          </form>
        </div>

        <div className="login-footer" aria-hidden>
          <a href="#">Privacidad y términos</a>
          <a href="#">Contactarnos</a>
          <a href="#">Cambiar región</a>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;