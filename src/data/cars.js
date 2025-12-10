import { scale } from "framer-motion";

export const cars = [
  {
    id: 1,
    name: "Mercedes Benz",
    model: '/models/mercedes_benz_w206_c220.glb',
    modelName: 'C220 (W206)',
    logo: '/images/mercedes.png',
    description: "A sophisticated compact executive sedan featuring a mild-hybrid powertrain, aerodynamic efficiency, and S-Class inspired interior technology.",
    scale: 5,
    specs: {
      engine: "2.0L Inline-4 Turbo (Mild Hybrid)",
      horsepower: 197, // Base engine output for C220d
      topSpeed: 152,   // ~245 km/h
    },
    color: "rgb(27,26,26)"
  },
  {
    id: 2,
    name: "McLaren",
    model: '/models/mclaren_p1.glb',
    modelName: 'P1',
    logo: '/images/mclaren1.png',
    description: "A limited-production plug-in hybrid hypercar that utilizes Formula 1 technology, including IPAS (Instant Power Assist System) for extreme performance.",
    scale: 2,
    specs: {
      engine: "3.8L Twin-Turbo V8 Hybrid",
      horsepower: 903, // Combined output
      topSpeed: 217,   // Electronically limited
    },
    color: "rgb(98,10,199)"
  },
  {
    id: 3,
    name: "Honda",
    model: '/models/honda_nsx_nc1.glb',
    modelName: 'NSX (NC1)',
    logo: '/images/honda.png',
    description: "The second-generation NSX is a hybrid supercar featuring a bespoke twin-turbo engine and a three-motor Sport Hybrid SH-AWD system for vectoring torque.",
    scale: 10,
    specs: {
      engine: "3.5L Twin-Turbo V6 Hybrid",
      horsepower: 573, // Combined output
      topSpeed: 191,
    },
    color: "rgb(167,16,16)"
  },
];