import React, { useState } from 'react';
import cloud from '../images/Clouds.png';
import rain from '../images/Rain.png';
import clear from '../images/Clear.png';
import mist from '../images/Mist.png';
import drizzle from '../images/Drizzle.png';
import err from '../images/Error.png';

const Myapp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    // Use the API key from environment variables
    const API_KEY = process.env.REACT_APP_API_KEY;

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const myFun = async () => {
        if (search === "") {
            setError("Please enter a city name.");
            return;
        }

        try {
            const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
            const jsonData = await get.json();
            console.log(jsonData);

            if (jsonData.cod === "404") {
                setError("Please enter a valid city name!");
                setData(null);
            } else {
                setData(jsonData);
                setError("");
            }
        } catch (err) {
            setError("An error occurred while fetching data.");
        }

        setSearch("");
    };

    return (
        <>
            <div className="container">
                <div className="inputs">
                    <input 
                        placeholder='Enter city, country'
                        onChange={handleInput}
                        value={search}
                    />
                    <button onClick={myFun}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <div>
                    {
                        error && 
                        <div className='errorPage'>
                            <p>{error}</p>
                            <img src={err} alt='Error' />
                        </div>
                    }

                    {
                        data && data.weather && (
                            <div className='weathers'>
                                <h2 className='cityName'>{data.name}</h2>

                                <img src={data.weather[0].main === "Clouds" ? cloud : "" } alt='' />
                                <img src={data.weather[0].main === "Rain" ? rain : "" } alt='' />
                                <img src={data.weather[0].main === "Clear" ? clear : "" } alt='' />
                                <img src={data.weather[0].main === "Mist" ? mist : "" } alt='' />
                                <img src={data.weather[0].main === "Haze" ? cloud : "" } alt='' />
                                <img src={data.weather[0].main === "Drizzle" ? drizzle : "" } alt='' />

                                <h2 className='temprature'>{Math.trunc(data.main.temp)} °C</h2>
                                <p className='climate'>{data.weather[0].description}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default Myapp;