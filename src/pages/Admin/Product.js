import React from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../../axios-client';
import ipconfig from '../../ipconfig';

function Product() {
    const { id } = useParams();
    const [currentImage, setCurrentImage] = React.useState("");

    React.useEffect( () => {
        window.scrollTo(0, 0);
        axiosClient(`/product/${id}`)
            .then( (res) => {
                console.log(res);
                const data = res.data.data

                setData({
                    name: data.name,
                    price: data.price,
                    category: data.category ? data.category : "",
                    subcategory: data.subcategory ? data.subcategory : "",
                    description: data.description ? data.description : "",
                    status: data.status ? data.status : ""
                })

                setCurrentImage(res.data.data.image);
            })
            .catch( (err) => {
                console.log(err);
            })
    }, [])

    const [data, setData] = React.useState({
        name: "",
        price: "",
        category: "",
        subcategory: "",
        description: "",
        status: ""
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

    const [image, setImage] = React.useState(null);

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
            const response = await axiosClient.post(`/editproduct/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            if(response.data.message === "successful"){
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setError(error.response.data.message);
        }
    };

    return (
        <div className='pt-14 mb-20 min-h-screen px-4 lg:px-40'>
            <div className='mt-5'>
                <span className='text-3xl font-semibold'>Edit Product</span>
            </div>
            <div className='flex w-full items-center justify-center'>
                <img className='rounded-lg max-w-72' src={`${ipconfig}/storage/${currentImage}`} alt="" />
            </div>
            <form className='flex flex-col gap-2 mt-5' onSubmit={handleSubmit}>
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
    )
}

export default Product