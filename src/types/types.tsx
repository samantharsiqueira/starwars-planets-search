export interface Planets {
  [key: string]: string | string[]; // tentando resolver o problema de tipagem
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

export type ColumnType = {
  colunm: string,
  sort: string
};

export type FiltersTypes = {
  tag: 'population' | 'orbital_period' | 'diameter' |
  'rotation_period' | 'surface_water';
  value: 'maior que' | 'menor que' | 'igual a';
  quantity: number;
};
