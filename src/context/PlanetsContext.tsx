import { createContext } from 'react';
import { Planets } from '../types/types';

export type PlanetContextType = {
  planets: Planets[];
  column: { colunm: string; sort: string };
};

const PlanetsContext = createContext({ } as PlanetContextType);

export default PlanetsContext;
