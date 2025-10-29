import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router";


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const navigate = useNavigate()

    const [user, setUser] = useState(null)

    const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('auth_token')))

    useEffect(
        () => {
            if(!localStorage.getItem('auth_token')) {
                setIsLogged(false)
                setUser(null)
                return
            }
            const user = decodeToken(localStorage.getItem('auth_token'))
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

    function onLogout(){
        localStorage.removeItem('auth_token')
        setIsLogged(false)
        setUser(null)
        navigate('/login')
    }

    function onLogin(auth_token){
        localStorage.setItem('auth_token', auth_token)
        setIsLogged(true)
        const user_session = decodeToken (auth_token)
        setUser(user_session)
        navigate('/home')
    }
    return <AuthContext.Provider
        value = {{
            isLogged,
            user,
            onLogout,
            onLogin
        }}
        >
        {children}
        </AuthContext.Provider>
}

export default AuthContextProvider