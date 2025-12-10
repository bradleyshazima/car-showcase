import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cars } from '../data/cars';
import Scene from '../components/Scene';
import CarModel from '../components/CarModel';

export default function Home() {
  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {cars.map((car, index) => (
          <motion.div
            key={car.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/car/${car.id}`}>
              <div className="h-64 bg-gray-900 rounded-lg overflow-hidden">
                <Scene>
                  <CarModel modelPath={car.model} />
                </Scene>
              </div>
              <h3 className="text-2xl mt-4">{car.name}</h3>
              <p className="text-gray-400">{car.specs.horsepower}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}