import { useState } from 'react';
import Head from 'next/head';
import keys from './api/keys';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(data => {
          setWeather(data);
        });
    }
  }

  const currentDate = () => {
    var date = String(new window.Date());
    date = date.slice(3, 15);
    return date; 
  }
  // ${typeof weather.main != 'undefined' ? weather.weather[0].icon.slice(weather.weather[0].icon.length - 1) : 'd'}
  return (
    <div className='flex flex-col justify-center items-center'>
      <Head>
        <title>Weather App</title>
        <meta charSet='UTF-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={`h-screen w-full lg:w-[480px] lg:h-[800px] lg:mt-32 lg:rounded-xl p-5 lg:shadow-lg duration-150 ease-in-out ${typeof weather.main !== 'undefined' ? (weather.weather[0].icon.includes('d') ? 'bg-background-d' : 'bg-background-n') : 'bg-background-d'} bg-cover`}>
        <input 
          className='w-full p-4 focus:shadow-xl rounded-md outline-0' 
          placeholder='search...' 
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={search}
        />
        { typeof weather.main !== 'undefined' ? 
          (
          <div className='text-center mt-16 text-white drop-shadow-md flex flex-col justify-center items-center'>
            <div className='text-xl'>{weather.name}, {weather.sys.country}</div>
            <div className='text-lg'>{currentDate()}</div>
            <div className='font-bold text-8xl p-5 drop-shadow-2xl'>{Math.round(weather.main.temp)}°C</div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <div className='font-semibold text-3xl p-5 drop-shadow-2xl'>{weather.weather[0].main}</div>
          </div>
          ) : ""
        }
      </div>
      
    </div>
  )
}
