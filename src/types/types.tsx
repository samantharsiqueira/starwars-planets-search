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
  [key: string]: any; // tentando resolver o problma de tipagem
}
// Define the type of the context
export type PlanetContextType = {
  planets: Planets[];
  filteredPlanets: Planets[];
  setFilteredPlanets: (planets: Planets[]) => void;
};

export type ColumnType = {
  colunm: string,
  sort: string
};

export type FiltersType = {
  column: string;
  comparison: string;
  value: number;
};
