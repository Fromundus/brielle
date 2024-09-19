import React from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function LogoutButton() {
    const navigate = useNavigate();
    const { setName, setToken, setRole, setId } = useStateContext();

    function logout(){

        axiosClient.post("/logout")
            .then( (res) => {
                console.log(res);
                setName(null);
                setToken(null);
                setRole(null);
                setId(null);
                navigate("/login");
            })
            .catch( (err) => {
                console.log(err);
                setName(null);
                setToken(null);
                setRole(null);
                setId(null);
                navigate("/login");
            })
    }

    return (
        <div>
            <button className='p-3 bg-primary rounded text-white' onClick={logout}>Logout</button>
        </div>
    )
}

export default LogoutButton