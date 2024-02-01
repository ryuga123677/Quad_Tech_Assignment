import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';

export const ItemDetail = () => {
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
const navigate = useNavigate();
    const findMovie = async () => {
        try {
            const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
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
            {loading ? (
                <SpinnerDotted />
            ) : (<>
                <div className='w-full flex bg-blue-100'>
                    <div className='w-[50%] h-full m-10 '>
                        <img src={items.image.original} alt="" className='rounded-md'/>
                    </div>
                    <div className='w-[50%] flex-column m-10 py-20 '>
                        <div className='font-bold text-6xl text-red-700'>{items.name}</div>
                        <div className='font-bold text-2xl'>
                            Rating-{items.rating?.average}
                        </div>
                        <div className='text-xl my-2'>
                        Languge-{items.language}
                       
                        <div className='my-2'>
                            Type-{items.type}
                        </div>
                        <div className='my-2'>
                            Premiered-{items.premiered}
                        </div>
                        <div className='my-2'>
                            Length-{items.averageRuntime}
                        </div>
                        
                        <div className='text-xl my-2'>Official Site-<a className='text-blue-400' href={items.officialSite}>{items.officialSite}</a></div>
                        <div className='text-lg my-2'>
                            Story-{items.summary}
                        </div>
                        <div className='my-2'>
                            Country-{items.network.country?.name}
                        </div>
                        <div className='my-2'>
                            TimeZone-{items.network.country?.timezone}
                        </div>
                        <button className='bg-red-300 rounded-md p-4 m-5' onClick={()=>{navigate(`/bookticket/${id}`)}}>Book Movie</button>

                    </div>

                    </div>
                   
                </div>
            </>
            )}
        </>
    );
};

