import React from 'react'
import {HomeFillIcon, GlobeIcon, PulseIcon, MoonIcon, SearchIcon, AiModelIcon} from '@primer/octicons-react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { cars } from '../data/cars'

const Navbar = () => {
  const { id } = useParams();
  const location = useLocation();
  
  // Check if we're on a car detail page
  const isCarPage = location.pathname.startsWith('/car/');
  
  // Get the current car based on the id from URL
  const currentCar = isCarPage ? cars.find(car => car.id === parseInt(id)) : null;
  
  // Use the car's logo if available, otherwise show default
  const logoSrc = currentCar?.logo || null;

  return (
    <div className='absolute z-20 w-[87%] h-20 flex top-10 items-center justify-between'>
      <Link to="/">
        <div className='flex items-center justify-center overflow-hidden'>
          {logoSrc ? (
            <img 
              src={logoSrc} 
              alt={currentCar?.name} 
              className='w-auto h-24'
            />
          ) : (
            <span className='text-2xl font-bold'>C</span>
          )}
        </div>
      </Link>
      
      <ul className='flex items-center gap-4'>
        <li>
          <Link to="/">
            <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
              <HomeFillIcon />
            </span>
          </Link>
        </li>
        <li>
          <Link to="/models">
            <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
              <GlobeIcon />
            </span>
          </Link>
        </li>
        <li>
          <Link to="/racing">
            <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
              <PulseIcon />
            </span>
          </Link>
        </li>
      </ul>
      
      <ul className='flex items-center gap-4'>
        <li>
          <Link to="/settings">
            <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
              <MoonIcon />
            </span>
          </Link>
        </li>
        <li>
          <Link to="/search">
            <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
              <SearchIcon />
            </span>
          </Link>
        </li>
        <li>
          <Link to="/ai">
            <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
              <AiModelIcon />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar