import React, { useState } from 'react';
import axiosClient from '../../axios-client';
import { IoClose } from 'react-icons/io5';
import ipconfig from '../../ipconfig';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';

function AddModal({ isModalOpen, setIsModalOpen }){
    const [data, setData] = React.useState({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        description: "",
        status: "available"
    });

    console.log(data);

    function handleChange(event){
        const { name, value } = event.target;

        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }

    const [image, setImage] = useState(null);

    const [error, setError] = React.useState({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        description: "",
        status: "",
        image: ""
    });

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        document.body.classList.remove('no-scroll');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('category', data.category);
        formData.append('subcategory', data.subcategory);
        formData.append('description', data.description);
        formData.append('status', data.status);
        formData.append('image', image);

        try {
            const response = await axiosClient.post('/addproduct', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if(response.data.message === "successful"){
                document.body.classList.remove('no-scroll');
                setIsModalOpen(false);
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    };

    if(!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-scroll">
                <div className='mb-4 flex justify-between items-center'>
                    <h2 className="text-2xl font-bold">Add Product</h2>
                    <button
                        onClick={handleModalClose}
                        className="text-pink-600 text-3xl"
                    ><IoClose /></button>
                </div>
                <form className='flex flex-col gap-2 mt-10 px-5' onSubmit={handleSubmit}>
                    <input
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary'
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    {error.name && <span className='text-sm text-pink-600'>{error.name}</span>}
                    

                    <input
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary'
                        type="number"
                        name='price'
                        placeholder="Price"
                        value={data.price}
                        onChange={handleChange}
                    />
                    {error.price && <span className='text-sm text-pink-600'>{error.price}</span>}
                    

                    <input
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary'
                        type="text"
                        name='category'
                        placeholder="Category"
                        value={data.category}
                        onChange={handleChange}
                    />
                    {error.category && <span className='text-sm text-pink-600'>{error.category}</span>}
                    

                    <input
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary'
                        type="text"
                        name='subcategory'
                        placeholder="Sub Category"
                        value={data.subcategory}
                        onChange={handleChange}
                    />
                    {error.subcategory && <span className='text-sm text-pink-600'>{error.subcategory}</span>}
                    

                    <input
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary'
                        type="text"
                        name='description'
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                    />      
                    {error.description && <span className='text-sm text-pink-600'>{error.description}</span>}                

                    <select
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary'
                        name="status"
                        id=""
                        onChange={handleChange}
                        value={data.status}
                        >
                        <option value="available">Available</option>
                        <option value="not available">Not Available</option>
                    </select>
                    {error.status && <span className='text-sm text-pink-600'>{error.status}</span>}
                    
                    <input
                        className='border-2 border-neutral-400 p-3 rounded-lg focus:outline-primary' 
                        type="file" 
                        onChange={handleImageChange}
                    />
                    {error.image && <span className='text-sm text-pink-600 text-wrap'>{error.image}</span>}

                    <button className='bg-primary p-3 rounded-lg font-bold text-white mt-5 mb-5' type="submit">Add Product</button>
                </form>
            </div>
        </div>
    )
}

const ImageUpload = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsloading] = React.useState(false);

    React.useEffect( () => {
        window.scrollTo(0, 0);
        setIsloading(true);

        axiosClient.get('/products')
            .then( (res) => {
                console.log(res);
                setProducts(res.data.data);
                setIsloading(false);
            })
            .catch( (err) => {
                console.log(err);
                setIsloading(false);
            })
    }, []);

    const renderProducts = products?.map( (item) => {
        return (
            <div key={item.id}>
                <div className='flex gap-4 border rounded-lg items-center p-2 w-full shadow-md'>
                    <div className='w-1/12 min-w-[100px]'>
                        <img className='rounded-lg' src={`${ipconfig}/storage/${item.image}`} alt="" />
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-semibold'>{item.name}</span>
                        <span className='text-primary font-semibold text-sm'>&#8369;{item.price}</span>
                    </div>
                    <div className='ms-auto flex gap-2'>
                        <Link to={`/r2/products/${item.id}`} className='p-2 bg-green-500 text-white rounded-lg text-xs'>Edit</Link>
                        <button className='p-2 bg-pink-800 text-white rounded-lg text-xs'>Delete</button>
                    </div>
                </div>
            </div>
        )
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
        document.body.classList.add("no-scroll");
    }

    return (
        <div className='min-h-screen pt-14 mb-20 lg:px-40 flex flex-col p-4'>
            <div className='flex justify-between'>
                <div className='mt-3'>
                    <span className='text-3xl font-semibold'>Products</span>
                </div>
                <div className='mt-3'>
                    <button className='p-2 bg-primary rounded-lg text-white' onClick={handleOpenModal}>Add</button>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                {isLoading && <Loader isLoading={isLoading} />}
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                {renderProducts}
            </div>
            {isModalOpen && <div className='lg:1/4 min-w-[200px] max-w-[400px]'>
                <AddModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>}
        </div>
    );
};

export default ImageUpload;
