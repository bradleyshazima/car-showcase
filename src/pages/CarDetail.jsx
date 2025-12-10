import { useParams, useNavigate, Link } from 'react-router-dom';
import { easeIn, motion } from 'framer-motion';
import { cars } from '../data/cars';
import Scene from '../components/Scene';
import CarModel from '../components/CarModel';
import Navbar from '../components/Navbar';
import '../App.css';
import { BookmarkFilledIcon, ArrowUpRightIcon, NorthStarIcon, ArrowRightIcon } from '@primer/octicons-react';
import { useState } from 'react';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const car = cars.find(c => c.id === parseInt(id));
  
  // Get next car
  const currentIndex = cars.findIndex(c => c.id === parseInt(id));
  const nextCar = cars[(currentIndex + 1) % cars.length];
  
  const bgColor = car?.color;

  const handleNextCar = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate(`/car/${nextCar.id}`);
      setIsExiting(false);
    }, 1200);
  };

  // Animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  const leftContentVariants = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

  const rightContentVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 }
  };

  const carVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 }
  };

  const bottomItemVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 }
  };

  return (
    <motion.div
      key={id}
      className="h-screen w-screen relative overflow-hidden flex flex-col items-center"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Navbar with exit animation */}
      <motion.div
        variants={navbarVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6 }}
        className="w-full flex justify-center"
      >
        <Navbar />
      </motion.div>

      {/* Car 3D Model with exit animation */}
      <motion.div
        className="h-full w-full mt-20"
        variants={carVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Scene>
          <CarModel modelPath={car.model} carName={car.name} />
        </Scene>
      </motion.div>

      {/* Left content (car name) */}
      <motion.div
        className='absolute top-44 left-28 z-20'
        variants={leftContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: isExiting ? 0 : 1.5, duration: 0.8, ease: easeIn }}
      >
        <h1 className='text-6xl font-semibold text-white drop-shadow-lg uppercase pop'>
          {car.name}
        </h1>
        <h4 className='text-white text-2xl font-medium drop-shadow-lg uppercase sf'>
          {car.modelName}
        </h4>
      </motion.div>

      {/* Right content (action buttons) */}
      <motion.div
        className='absolute z-20 top-1/2 -translate-y-1/2 right-28'
        variants={rightContentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ delay: isExiting ? 0 : 1.5, duration: 0.8 }}
      >
        <ul className='flex flex-col gap-4'>
          <li>
            <Link to="/">
              <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
                <BookmarkFilledIcon />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
                <NorthStarIcon />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className='w-10 h-10 flex items-center justify-center bg-white drop-shadow-xl rounded-full hover:bg-gray-100 transition'>
                <ArrowUpRightIcon />
              </span>
            </Link>
          </li>
        </ul>
      </motion.div>

      {/* Bottom section with staggered animations */}
      <div className='absolute left-0 bottom-0 py-16 gap-6 flex items-start justify-between w-full px-28 bg-grad'>
        {/* Specs - First to animate */}
        <motion.div
          className='flex gap-4 max-w-1/3'
          variants={bottomItemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: isExiting ? 0 : 1.8, duration: 0.6 }}
        >
          <ul className='flex flex-col gap-4'>
            <li>
              <span className='pheno text-white tracking-wide text-5xl flex items-end drop-shadow-2xl'>
                {car.specs.horsepower} <p className='text-2xl ml-2'>hp</p>
              </span>
              <p className='sf text-base font-medium text-white/60'>Power</p>
            </li>
            <li>
              <span className='pheno text-white tracking-wide text-5xl flex items-end'>
                {car.specs.topSpeed} <p className='text-2xl ml-2'>mph</p>
              </span>
              <p className='sf text-base font-medium text-white/60'>Top Speed</p>
            </li>
          </ul>
          <ul className='flex flex-col gap-4'>
            <li>
              <span className='pheno text-white tracking-wide text-5xl flex items-end'>
                {car.specs.engine}
              </span>
              <p className='sf text-base font-medium text-white/60'>Engine</p>
            </li>
          </ul>
        </motion.div>

        {/* Description - Second to animate */}
        <motion.div
          className='flex-1 h-40 flex'
          variants={bottomItemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: isExiting ? 0.1 : 2, duration: 0.6 }}
        >
          <p className='text-white text-base drop-shadow-lg sf font-medium text-center self-center'>
            {car.description}
          </p>
        </motion.div>

        {/* Next car preview - Last to animate */}
        <motion.div
          variants={bottomItemVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: isExiting ? 0.2 : 2.2, duration: 0.6 }}
        >
          <div className='w-72 flex flex-col items-center gap-2'>
            {/* Next car preview with 3D model */}
            <div 
              className='w-full h-32 rounded-xl overflow-hidden relative'
              style={{ backgroundColor: nextCar.color }}
            >
              <div className="w-full h-full">
                <Scene>
                  <CarModel modelPath={nextCar.model} autoRotate={true} />
                </Scene>
              </div>
              {/* Overlay gradient for better visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
            
            <button onClick={handleNextCar}>
              <span className='flex rounded-xl w-72 py-2 items-center justify-center text-lg sf font-medium text-[#1e1e1e] bg-white backdrop-blur-xl gap-4 hover:gap-8 tran'>
                Next Supercar <ArrowRightIcon />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}