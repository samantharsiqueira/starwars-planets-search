import { createContext } from 'react';

// Define the type of the planets

export interface Planets {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;

}
// Define the type of the context
export type PlanetContextType = {
  planets: Planets[];
};

const PlanetsContext = createContext({ planets: [] } as PlanetContextType);

export default PlanetsContext;
