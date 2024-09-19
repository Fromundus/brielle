import React from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

function Payment() {
    const { order_id } = useParams();
    console.log(order_id);

    const [order, setOrder] = React.useState();
    console.log(order);

    React.useEffect( () => {
        axiosClient.get(`order/${order_id}`)
            .then( (res) => {
                console.log(res);
                setOrder(res.data.data);
            })
            .catch( (err) => {
                console.log(err);
            })
    }, []);

    function createPayment(){

    }

    return (
        <div className='pt-14 mb-20 p-4 lg:px-40'>
            <div className='mt-5'>
                <span className='text-3xl font-semibold'>Payment</span>
            </div>
            <div>
                <span>Your order is placed. Pay the items to continue.</span>
                <button></button>
            </div>
        </div>
    )
}

export default Payment