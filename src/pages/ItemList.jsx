import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SpinnerDotted } from 'spinners-react';
import { useNavigate } from 'react-router-dom';

export const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    const getItems = async () => {

        try {
            const response = await axios.get("https://api.tvmaze.com/search/shows?q=all");
            setItems(response.data);
            console.log(response.data);
            
            setLoading(false);

        } catch (err) {
            console.error(err);
            setLoading(false);
        }

    };

    useEffect(() => {
        getItems();
       


    }, []);


    return (
        <>
         
            {loading ? (
                <SpinnerDotted className=''/>
            ) : (
                <div className='grid gap-4 grid-cols-4 grid-rows-3 m-[30px]'>
                    {items.map((item, index) => (
                    <button onClick={()=>navigate(`/details/${item.show.id}`)}>
                        <div key={index} className='flex-column rounded-lg w-[90%] bg-gray-100 justify-center pl-[25px] pt-[10px] pb-[10px] shadow-md'>
                            <div className='h-[400px] w-[89%] hover:scale-110 duration-300 transition-all justify-center '>
                            <img src={ item.show.image?.original} alt="Image Not Avaliable" className='object-fit-cover w-full h-full rounded-md' />
                            </div>
                      
                        <h2 className='font-bold'>{item.show.name}</h2>
                        <div>{item.show.premiered}</div>
                        <div>Rating-{item.show.rating?.average}</div>

                        </div>
                        </button>
                      
                        
                        
                    ))}
                </div>
            )}
        </>
    );
};