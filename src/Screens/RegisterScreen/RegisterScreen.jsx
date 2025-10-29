import React from "react";
import { useState } from "react";
import useForm from "../../hooks/useforms";
import { register } from "../../services/authService";
import useFetch from "../../hooks/useFetch";


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

    const { response, error, loading, sendRequest} = useFetch()

    function onRegister(form_state_sent) {
        rese
        sendRequest(
            () => {
                return register(
                    form_state[REGISTER_FORM_FIELDS.USERNAME],
                    form_state[REGISTER_FORM_FIELDS.EMAIL],
                    form_state[REGISTER_FORM_FIELDS.PASSWORD]
                )
            }
        )
    }

    const {
        form_state, 
        onInputChange, 
        handleSubmit, 
        resetForm
    } = useForm (
        initial_form_state,
        onRegister
    ) 

    console.log(response)

    return (
        <div>
            <h1>Registrate</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="username">Nombre de usuario</label>
                    <input 
                        type="text" 
                        placeholder="pepe" 
                        value={form_state[REGISTER_FORM_FIELDS.USERNAME]}
                        name={REGISTER_FORM_FIELDS.USERNAME}
                        id='username'
                        onChange={onInputChange}    
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        placeholder="pepe@gmail.com" 
                        value={form_state[REGISTER_FORM_FIELDS.EMAIL]}
                        name={REGISTER_FORM_FIELDS.EMAIL}
                        id='email'
                        onChange={onInputChange}
                    />
                </div>
                <div className="form-field">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="text" 
                        placeholder="pepe-123" 
                        value={form_state[REGISTER_FORM_FIELDS.PASSWORD]}
                        name={REGISTER_FORM_FIELDS.PASSWORD}
                        id='password'
                        onChange={onInputChange}
                    />
                </div>
                {error && <span style={{color: 'red'}}> {error} </span>}
                {response && <span style={{color: 'green'}}> Usuario registrado con exito! </span>}
                {
                    loading
                    ?<button disabled>Registrando</button>
                    :<button>Registrarse</button>
                }
            </form>
        </div>
    )
}

export default RegisterScreen