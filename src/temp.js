import React, { useState, useEffect } from 'react'
import "./style.css"
import bg from "./bg.jpg"



const Temp = () => {
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (search.trim() !== '') {
                    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=741c104843241ba122247423ff6ce290`;
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.cod === '404') {
                        setCity(null); // City not found
                    } else {
                        setCity(data);
                    }
                } else {
                    setCity(null);
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        if (searchClicked) {
            fetchApi();
        } 
    }, [search, searchClicked]);

    const handleSearch = () => {
        setSearchClicked(true);
    };

    return (
        <> 
        <img src={bg} alt="" />
        <div className='head'>

            {/* <div className="heading"> <h1>Weather</h1></div> */}
            <div className="text">

            <input
                type="text"
                placeholder="Enter City"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <i className="fa-solid fa-magnifying-glass search" onClick={handleSearch}></i>
            
                </div>
            {searchClicked && city === null ? (
                <p className='no-data'>No data found</p>
                ) : city ? (
                <div className='text2'>
                    <div className="city-name">{city.name}</div>
                    <div className="temp">Temp : {city.main.temp}ºC</div>
                    <div className="mood">{city.weather[0].main}</div>
                </div>
            ) : null}
            </div>
        </>
    );
};


export default Temp