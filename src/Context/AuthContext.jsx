import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router";

export const AUTH_TOKEN_KEY = 'auth_token'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem(AUTH_TOKEN_KEY)))

    useEffect(
        () => {
            if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
                setIsLogged(false)
                setUser(null)
                return
            }
            const user = decodeToken(localStorage.getItem(AUTH_TOKEN_KEY))
            if (user) {
                setUser(user)
                setIsLogged(true)
            }
            else {
                setIsLogged(false)
                setUser(null)
            }
        },
        []
    )

    function onLogout() {
        localStorage.removeItem(AUTH_TOKEN_KEY)
        setIsLogged(false)
        setUser(null)
        navigate('/login')
    }

    function onLogin(auth_token) {
        const prevToken = localStorage.getItem(AUTH_TOKEN_KEY);
        // Si el token es igual y ya estamos logueados, no hacemos nada
        if (prevToken === auth_token && isLogged) return;

        localStorage.setItem(AUTH_TOKEN_KEY, auth_token);
        setIsLogged(true);
        const user_session = decodeToken(auth_token);
        setUser(user_session);
        navigate('/home'); // si querés que la navegación la haga el contexto, la dejamos aquí
    }
    return <AuthContext.Provider
        value={{
            isLogged,
            user,
            onLogin,
            onLogout
        }}
    >
        {children}
    </AuthContext.Provider>
}

export default AuthContextProvider