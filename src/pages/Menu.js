import React from 'react'
import axiosClient from '../axios-client';
import ipconfig from '../ipconfig';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { FiMinus, FiPlus } from 'react-icons/fi';
import Loader from '../components/Loader';
import data from "../ProductsData"

const ProductModal = ({ isOpen, product, setCart, setIsModalOpen, setSelected }) => {
    const [quantity, setQuantity] = React.useState(1);

    function quantityMinus(){
        setQuantity((prev) => {
            if(prev === 1){
                return 1
            }
            return prev - 1
        })
    }

    function quantityPlus(){
        setQuantity(prev => prev + 1);
    }

    function addToCart(id){
        setCart((prev) => {
            const existingItemId = prev.findIndex((item) => {
                if(item.id === id){
                    return item.id
                }
            });

            if(existingItemId !== -1){
                const updatedCart = prev.map((item, index) => {
                    if (index === existingItemId) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity
                        };
                    }
                    return item;
                });
                return updatedCart;
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: quantity,
                        isSelected: false
                    }
                ]
            }

        })

        document.body.classList.remove('no-scroll');
        setQuantity(1);
        setIsModalOpen(false);
    }

    function onClose(){
        document.body.classList.remove('no-scroll');
        setIsModalOpen(false);
        setQuantity(1);
    }

    function handleSelect(product){
        document.body.classList.remove('no-scroll');
        const newArray = [];

        const selected = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            isSelected: true
        }
        
        newArray.push(selected);
        setSelected(newArray);
    }

    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-scroll">
                <div className='mb-2 flex justify-between items-center'>
                    <button
                        onClick={onClose}
                        className="text-pink-600 text-3xl ms-auto"
                    ><IoClose /></button>
                </div>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-h-[250px] object-contain rounded-lg"
                />
                <h2 className="text-xl mt-2">{product.name}</h2>
                <p className="mt-2 text-primary text-xl">&#8369;{product.price}</p>
                <div className='flex items-center gap-4 text-2xl mt-2 w-full justify-center'>
                    <button onClick={quantityMinus}><FiMinus /></button>
                    <div className='w-20 text-center'>
                        <span className='font-semibold'>{quantity}</span>
                    </div>
                    <button onClick={quantityPlus}><FiPlus /></button>
                </div>
                <div className='flex flex-col mt-4 gap-2'>
                    <button className='border-2 border-primary text-primary rounded-lg p-3' onClick={() => addToCart(product.id)}>Add to Cart</button>
                    <Link to="/checkout" className='border-2 text-center border-primary bg-primary text-white rounded-lg p-3' onClick={() => handleSelect(product)}>Checkout <span className='font-semibold'>(&#8369;{product.price * quantity})</span></Link>
                </div>
            </div>
        </div>
    );
}

function Menu() {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { cart, setCart, setSelected } = useOutletContext();
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const productFilter = searchParams.get("category");
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [search, setSearch] = React.useState("");


    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, [searchParams]);

    const handleSearch = (event) => {
        const searchInput = event.target.value;
        setSearch(searchInput);
        window.scrollTo(0, 0);
    }

    const handleProductClick = (product) => {
        document.body.classList.add('no-scroll');
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    React.useEffect( () => {
        document.body.classList.remove('no-scroll');
        setSelected([]);

        setProducts(data);

        // setIsloading(true);
        // axiosClient.get('/products')
        //     .then( (res) => {
        //         console.log(res);
        //         setProducts(res.data.data);
        //         setIsloading(false);
        //     })
        //     .catch( (err) => {
        //         console.log(err);
        //         setIsloading(false);
        //     })
        setProducts(data);
    }, []);

    let filteredProducts;

    if(productFilter && search !== ""){
        filteredProducts = [];
        for(let i = 0; i < products.length; i++){
            if(products[i].category === productFilter && products[i].name.toLowerCase().includes(search.toLowerCase())){
                filteredProducts.push(products[i]);
            }
        }
    } else if(productFilter){
        filteredProducts = [];
        for(let i = 0; i < products.length; i++){
            if(products[i].category === productFilter){
                filteredProducts.push(products[i]);
            }
        }
    } else if(search !== ""){
        filteredProducts = [];
        for(let i = 0; i < products.length; i++){
            if(products[i].name.toLowerCase().includes(search.toLowerCase())){
                filteredProducts.push(products[i]);
            }
        }
    } else {
        filteredProducts = products;
    }

    const renderProducts = filteredProducts?.map( (item) => {
        return (
            <div key={item.id} className='p-2 rounded w-1/2 md:w-1/3 lg:w-1/4 min-h-[300px]'>
                <div className='min-h-full flex flex-col justify-between rounded-lg shadow-md' onClick={() => handleProductClick(item)}>    
                    <div
                        className='flex items-center justify-center bg-cover bg-center w-full h-72 rounded-lg'
                        style={{
                            backgroundImage: `url(${item.image})`
                        }}
                    >
                    </div>
                    <div className='flex flex-col p-2 mt-2 px-4'>
                        <span className='text-primary mt-1 text-sm font-semibold'>&#8369;{item.price}</span>
                        <span className='font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>{item.name}</span>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className="pt-14 p-4 min-h-screen mb-20 lg:px-40 flex flex-col items-center">
            <div className='mt-3'>
                <span className='text-3xl font-semibold'>Menu</span>
            </div>
            <div className='w-full px-2 sticky top-12 bg-white pb-3'>
                <input className='w-full p-3 rounded-3xl mt-3 px-5 border-2 border-neutral-400 focus:outline-primary' type="text" placeholder='Search...' onChange={handleSearch} value={search} />
                <div className='mt-3 px-4 flex gap-4'>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === null ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({})}>All</button>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === "Food" ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({category: "Food"})}>Foods</button>
                    <button
                        className={`border-2 px-3 py-1 rounded-2xl ${productFilter === "Drink" ? "border-primary bg-primary text-white" : "border-neutral-400 text-neutral-400"}`}
                        onClick={() => setSearchParams({category: "Drink"})}>Drinks</button>
                </div>
            </div>
            {isLoading && <Loader isLoading={isLoading} />}
            <div className='flex flex-wrap w-full'>
                {renderProducts}
            </div>
            {selectedProduct && (
                <ProductModal 
                    isOpen={isModalOpen} 
                    product={selectedProduct} 
                    setCart={setCart} 
                    setIsModalOpen={setIsModalOpen}
                    setSelected={setSelected}
                />
            )}
        </div>
    )
}

export default Menu