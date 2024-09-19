import React from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import ipconfig from '../../ipconfig';
import axiosClient from '../../axios-client';
import { RiDeleteBin5Fill, RiSave2Fill } from "react-icons/ri";

function UserCart() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { cart, setCart, selected, setSelected, onEdit, setOnEdit } = useOutletContext();
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [selectAll, setSelectAll] = React.useState(false);
    const navigate = useNavigate();

    
    // React.useEffect( () => {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }, [cart]);
    
    console.log(cart);

    React.useEffect( () => {
        const newArray = [];
        cart.forEach((item) => {
            if(item.isSelected === true){
                newArray.push(item);
            }
        });

        // setSelected(newArray);
    }, [cart])
    
    React.useEffect( () => {
        if(selectAll){
            const selectedAll = cart.map( (item) => {
                return {
                    ...item,
                    isSelected: true
                }
            })

            setCart(selectedAll);
        } else {
            const selectedAll = cart.map( (item) => {
                return {
                    ...item,
                    isSelected: false
                }
            })

            setCart(selectedAll);
        }
    }, [selectAll]);

    function allSelected(array){
        return array.every((item) => {
            return item.isSelected === true
        });
    }

    function handleCheck(product_id) {
        setCart((prev) => 
            prev.map((item) => 
                item.product_id === product_id 
                    ? { ...item, isSelected: !item.isSelected } 
                    : item
            )
        );
    }

    function handleSelectAll(){
        setSelectAll(prev => !prev)
    }

    function handleEditToggle(){
        setOnEdit(prev => !prev);
    }

    React.useEffect(() => {
        let total = 0;
        cart.forEach((item) => {
            if (item.isSelected) {
                total += Number(item.price) * Number(item.quantity);
            }
        });
    
        setTotalPrice(total);
    }, [cart]);

    function quantityMinus(id, product_id){
        setOnItemEdit((prev) => {
            if(prev.includes(product_id)){
                return prev
            } else {
                return [
                    ...prev,
                    product_id
                ]
            }
        });
        setCart((prev) => 
            prev.map( (item) => {
                if(item.id === id){
                    return {
                        ...item,
                        quantity: item.quantity < 2 ? 1 : Number(item.quantity) - 1
                    }
                } else {
                    return item;
                }
            })
        );
    }

    function quantityPlus(id, product_id){
        setOnItemEdit((prev) => {
            if(prev.includes(product_id)){
                return prev
            } else {
                return [
                    ...prev,
                    product_id
                ]
            }
        });
        setCart((prev) => 
            prev.map((item) => {
                if(item.id === id){
                    return {
                        ...item,
                        quantity: Number(item.quantity) + 1
                    }
                } else {
                    return item;
                }
            })
        );
    }

    function handleSave(product_id, cart_id){
        setOnItemEdit((prev) => {
            const newArray = prev.filter((item) => {
                if(item !== product_id){
                    return item
                }
            });

            return newArray;
        });

        const product = cart.find(item => item.product_id === product_id);
        const quantity = product ? product.quantity : null;
        
        const data = {
            quantity: quantity
        }

        axiosClient.put(`/updatecart/${product_id}/${cart_id}`, data)
            .then( (res) => {
                console.log(res);
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    function deleteItem(product_id, cart_id){
        axiosClient.delete(`/removefromcart/${product_id}/${cart_id}`)
            .then( (res) => {
                console.log(res);

                const newArray = [];
                cart.find( (item) => {
                    if(item.product_id === product_id){
        
                    } else {
                        newArray.push(item);
                    }
                });
        
                setCart(newArray);
            })
            .catch( (err) => {
                console.log(err);
            })
    }

    const [onItemEdit, setOnItemEdit] = React.useState([]);
    console.log(onItemEdit);

    const renderCart = cart.map( (item) => {
        return (
            <div key={item.product_id}>
                <div className='flex gap-4 rounded-lg items-center p-2 w-full shadow-md'>
                    {!onEdit && <div>
                        <input type="checkbox" className='w-[20px] h-[20px]' onChange={() => handleCheck(item.product_id)} checked={item.isSelected} />
                    </div>}
                    <div className='w-1/12 min-w-[100px] min-h-[100px] flex items-center'>
                        <img className='rounded-lg' src={`${ipconfig}/storage/${item.image}`} alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{item.name}</span>
                        <span className='text-primary font-semibold'>&#8369;{item.price}</span>
                        <div className='flex items-center mt-1'>
                            {onEdit && <button className={`${!onEdit ? "cursor-not-allowed" : ""}`} onClick={() => quantityMinus(item.id, item.product_id)} disabled={!onEdit}><FiMinus /></button>}
                            <div className='w-10 text-center'>
                                <span className='font-semibold'>{!onEdit && "x"} {item.quantity}</span>
                            </div>
                            {onEdit && <button className={`${!onEdit ? "cursor-not-allowed" : ""}`} onClick={() => quantityPlus(item.id, item.product_id)} disabled={!onEdit}><FiPlus /></button>}
                        </div>
                    </div>
                    {onEdit && <div className='ms-auto flex'>
                        {onItemEdit.includes(item.product_id) && <button className='p-2 bg-green-400 text-white rounded-lg mx-2 min-h-[100px] text-2xl' onClick={() => handleSave(item.product_id, item.cart_id)}><RiSave2Fill /></button>}
                        <button className='p-2 bg-pink-700 text-white rounded-lg min-h-[100px] text-2xl' onClick={() => deleteItem(item.product_id, item.cart_id)}><RiDeleteBin5Fill /></button>
                    </div>}
                </div>
            </div>
        )
    });

    return (
        <div className='min-h-screen pt-14 mb-40 p-4 lg:px-40 flex flex-col'>
            <div className='mt-5 flex justify-between'>
                <span className='text-3xl font-semibold'>Cart</span>
                {cart.length > 0 && <button className={`p-2 rounded-lg text-white ${onEdit ? "bg-pink-700" : "bg-primary" }`} onClick={handleEditToggle}>{onEdit ? "Close" : "Edit"}</button>}
            </div>
            <div className='flex flex-col gap-2 mt-5'>
                {renderCart}
            </div>
            <div className='fixed bottom-14 bg-white w-full left-0 lg:px-40'>
                {totalPrice < 100 && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-3">
                    <div className="flex items-center gap-2 text-red-800">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                        </svg>
                        <strong className="block font-medium"> Minimum order: &#8369; 100.00 </strong>
                    </div>
                </div>}
                <div className='flex bg-white border'>
                    {!onEdit && cart.length > 0 && <div className='flex items-center ps-6 lg:ps-2 gap-2'>
                        <input id='selectall' type="checkbox" className='w-[20px] h-[20px]' onChange={handleSelectAll} checked={allSelected(cart)} />
                        <label className='text-sm cursor-pointer' htmlFor="selectall">Select All</label>
                    </div>}
                    <div className='ms-auto flex items-center gap-4 justify-between'>
                        <span className='font-semibold'>Total: <span className='text-2xl'>&#8369;{totalPrice}</span></span>
                        <button className={`bg-primary text-white h-full p-4 ${totalPrice < 100 || onEdit ? "cursor-not-allowed bg-gray-400" : ""}`} onClick={() => navigate('/r3/checkout')} disabled={totalPrice < 100 || onEdit}>Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCart