import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';
export const BookTicket = () => {
    const navigate = useNavigate();
    const { item } = useParams();
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setData] = useState({
        name: '',
        address: '',
        email: '',
        slot: 0,
        category: '',

    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Store the form data in localStorage
        localStorage.setItem('formData', JSON.stringify(formData));
        navigate(-1);

    };
    const findMovie = async () => {
        try {
            const response = await axios.get(`https://api.tvmaze.com/shows/${item}`);
            setItems(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };



    useEffect(() => {
        findMovie();
    }, []);
    return (
        <> 
            {loading ? (<SpinnerDotted className='m-[50%]'/>) : (
                <>
                    <div className='flex m-20 gap-[50px] justify-center bg-blue-100 rounded-md p-4'>

                        <div className='w-[20%] h-[100%] '>
                            <img src={items.image.original} alt="" className='rounded-md'/>
                        </div>
                        <div className='flex-column'>
                            <div className='text-4xl text-red-500'>{items.name}</div>
                            <form onSubmit={handleSubmit}>
                                <div className='flex-column h-[50%] justify-center'>

                                    <div className='text-lg m-4'>
                                        <label htmlFor="name">Name - </label>
                                        <input type="text" name="name" className='rounded-md' placeholder="Name" value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div className='text-lg m-4'>
                                        <label htmlFor="email">Email - </label>
                                        <input type="text" name="email" className='rounded-md' placeholder="Email" value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div className='text-lg m-4'>
                                        <label htmlFor="address">Address - </label>
                                        <input type="text" name="address" className='rounded-md' placeholder="Address" value={formData.address} onChange={handleChange} />
                                    </div>
                                    <div className='text-lg m-4'>
                                        <label htmlFor="slot">Slot - </label>
                                        <input type="number" name="slot" className='rounded-md' placeholder="Slot" value={formData.slot} onChange={handleChange} />
                                    </div>
                                    <div className='text-lg m-4'>
                                        <label htmlFor="category">Category - </label>
                                        <input type="text" name="category" className='rounded-md' placeholder="Category" value={formData.category} onChange={handleChange} />
                                    </div>

                                    <button type='submit' className='bg-red-300 rounded-md p-4 m-5'>Book</button>

                                </div>


                            </form>

                        </div>
                    </div>

                </>)}
        </>
    )
}
