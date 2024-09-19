import React, { useContext } from "react";
import { createContext } from "react";

const StateContext = createContext({});

export function ContextProvider({children}){
    const [role, _setRole] = React.useState(localStorage.getItem("auth_role"));
    const [name, _setName] = React.useState(localStorage.getItem("auth_name"));
    const [token, _setToken] = React.useState(localStorage.getItem("auth_token"));
    const [id, _setId] = React.useState(localStorage.getItem("auth_id"));
    
    function setToken(token){
        _setToken(token)

        if(token){
            localStorage.setItem("auth_token", token);
        } else {
            localStorage.removeItem("auth_token");
        }
    }

    function setName(name){
        _setName(name)

        if(name){
            localStorage.setItem("auth_name", name);
        } else {
            localStorage.removeItem("auth_name");
        }
    }

    function setRole(role){
        _setRole(role)

        if(role){
            localStorage.setItem("auth_role", role);
        } else {
            localStorage.removeItem("auth_role");
        }
    }

    function setId(id){
        _setId(id)

        if(id){
            localStorage.setItem("auth_id", id);
        } else {
            localStorage.removeItem("auth_id");
        }
    }

    return (
        <StateContext.Provider value={{
            role,
            setRole,
            name,
            setName,
            token,
            setToken,
            id,
            setId
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);