import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Planets, ColumnType } from '../types/types';
import PlanetsContext from './PlanetsContext';

type PlanetsProviderProps = {
  children: React.ReactNode;
};

function PlanetsProvider({ children }: PlanetsProviderProps) {
  const { planets, loading } = useFetch();
  const [column, setColumn] = useState<ColumnType>({ colunm: '', sort: '' });
  const [filteredPlanets, setFilteredPlanets] = useState<Planets[]>(planets);
  console.log(planets);

  useEffect(() => { setFilteredPlanets(planets); }, [planets]);

  const starWars = planets.map((key: Planets) => (
    {
      name: key.name,
      rotation_period: key.rotation_period,
      orbital_period: key.orbital_period,
      diameter: key.diameter,
      climate: key.climate,
      gravity: key.gravity,
      terrain: key.terrain,
      surface_water: key.surface_water,
      population: key.population,
      films: key.films,
      created: key.created,
      edited: key.edited,
      url: key.url,
    }
  ));

  const contextValue = {
    planets: starWars,
    column,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (

    <PlanetsContext.Provider
      value={ contextValue }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
