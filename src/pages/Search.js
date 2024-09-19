import React from 'react'
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

function Search() {
    const [search, setSearch] = React.useState("");
    const [recommendation, setRecommendation] = React.useState(localStorage.getItem("order_id") || "");
    const [order, setOrder] = React.useState("");
    const navigate = useNavigate();

    console.log(order);
    
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    function handleChange(e){
        const { value } = e.target;
        setSearch(value);
        setOrder("")
    }

    function searchOrder(order_id){
        // axiosClient.get(`/order/${order_id}`)
        //     .then( (res) => {
        //         console.log(res);
        //         if(res.data.status === 200){
        //             localStorage.setItem("order_id", res.data.data.order_id);
                    navigate(`/order/${order_id}`);
            //     } else if(res.data.status === 404){
            //         localStorage.removeItem("order_id");
            //         setOrder(null);
            //     }
            // })
            // .catch( (err) => {
            //     console.log(err);
            // })
    }

    return (
        <div className='pt-14 mb-20 min-h-screen p-4 lg:px-40 flex flex-col items-center'>
            <div className='mt-3'>
                <span className='text-3xl font-semibold'>Track Orders</span>
            </div>
            <div className='w-full px-2 sticky top-12 bg-white pb-5'>
                <div className='relative'>
                    <input className='w-full p-3 rounded-3xl mt-3 ps-5 pe-24 border-2 border-neutral-400 focus:outline-primary' type="text" placeholder='Paste your Order ID here.' onChange={handleChange}/>
                    <button className={`absolute right-2 top-[20px] border-2 px-3 py-1 rounded-2xl text-white ${search === "" ? "border-neutral-400 bg-neutral-400 cursor-not-allowed" : "border-primary bg-primary"}`} disabled={search === ""} onClick={() => searchOrder(search)}>Search</button>
                </div>
                <div className='mt-3 px-4 flex items-center justify-center gap-1'>
                    {(search === "" && recommendation) && 
                    <>
                        <span className={`border-2 px-3 py-1 text-xs rounded-2xl border-primary bg-primary text-white cursor-pointer`} onClick={() => searchOrder(recommendation)}>{recommendation}</span>
                    </>
                    }
                </div>
                {order === null && <div className='w-full flex justify-center items-center min-h-screen'>
                    <span className='text-2xl font-semibold'>No Result</span>
                </div>}
            </div>
        </div>
    )
}

export default Search