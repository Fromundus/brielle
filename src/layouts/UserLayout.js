import React from 'react'
import Header from '../components/User/Header'
import Navbar from '../components/User/Navbar'
import axiosClient from '../axios-client';
import { Outlet } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

function UserLayout() {
    const [userData, setUserData] = React.useState({});
    const [cart, setCart] = React.useState([]);
    const [onEdit, setOnEdit] = React.useState(false);
    const { id } = useStateContext();

    // console.log(cart);

    React.useEffect( () => {
        axiosClient.get(`users/${id}`)
            .then( (res) => {
                setUserData(res.data.data);
                setCart(res.data.data.cart.cart_items)
            })
            .catch( (err) => {
                console.log(err);
            })
    }, [onEdit]);

    return (
        <div className="relative min-h-screen">
            <Header cartLength={cart.length} />
            <Outlet context={{userData, setUserData, cart, setCart, onEdit, setOnEdit}} />
            <Navbar />
        </div>
    )
}

export default UserLayout