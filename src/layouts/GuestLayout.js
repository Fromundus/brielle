import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/Guest/Header'
import Navbar from '../components/Guest/Navbar'
import { useStateContext } from '../context/ContextProvider'

function GuestLayout() {
    const { role } = useStateContext();
    const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [selected, setSelected] = React.useState(JSON.parse(localStorage.getItem('selected')) || []);

    React.useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('selected', JSON.stringify(selected));
    }, [cart, selected]);

    if(role){
        return <Navigate to={`r${role}`} />
    }

    return (
        <div className="relative min-h-screen">
            <Header cartLength={cart.length} />
            <Outlet context={{cart, setCart, selected, setSelected}} />
            <Navbar />
        </div>
    )
}

export default GuestLayout