import { createContext } from 'react';
import { Planets } from '../types/types';

export type PlanetContextType = {
  planets: Planets[];
  filteredPlanets: Planets[];
  setFilteredPlanets: (planets: Planets[]) => void;
};

const PlanetsContext = createContext({ } as PlanetContextType);

export default PlanetsContext;
