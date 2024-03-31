import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { Planets } from '../types/types';

function Table() {
  const { filteredPlanets } = useContext(PlanetsContext);
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState({ column: 'name', sort: 'ASC' });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  // Inverte a ordem da coluna, atualizando o estado com a ordem
  const handleSortOrder = (column:string) => {
    let newSort: string;
    if (sortOrder.column === column) {
      newSort = sortOrder.sort === 'ASC' ? 'DESC' : 'ASC';
    } else {
      newSort = 'ASC';
    }

    const newSortOrder = {
      column,
      sort: newSort,
    };

    setSortOrder(newSortOrder);
  };
  // Função de comparação para ordenar os planetas, ver qual vem primeiro na ordem asc ou dsc
  const comparePlanets = (a:Planets, b:Planets) => {
    const aValue = a[sortOrder.column];
    const bValue = b[sortOrder.column];

    if (sortOrder.sort === 'ASC') {
      if (aValue > bValue) return 1;
      if (aValue < bValue) return -1;
    } else {
      if (aValue < bValue) return 1;
      if (aValue > bValue) return -1;
    }
    return 0;
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder = {
      ...sortOrder,
      sort: event.target.value as 'ASC' | 'DESC',
    };
    setSortOrder(newSortOrder);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name"
        value={ filterText }
        onChange={ handleFilter }
        data-testid="name-filter"
      />
      <table>
        <thead>
          <tr>
            <th onClick={ () => handleSortOrder('name') }>Name</th>
            <th onClick={ () => handleSortOrder('rotation_period') }>Rotation Period</th>
            <th onClick={ () => handleSortOrder('orbital_period') }>Orbital Period</th>
            <th onClick={ () => handleSortOrder('diameter') }>Diameter</th>
            <th onClick={ () => handleSortOrder('climate') }>Climate</th>
            <th onClick={ () => handleSortOrder('gravity') }>Gravity</th>
            <th onClick={ () => handleSortOrder('terrain') }>Terrain</th>
            <th onClick={ () => handleSortOrder('surface_water') }>Surface Water</th>
            <th onClick={ () => handleSortOrder('population') }>Population</th>

            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets
  && filteredPlanets.filter((planet) => {
    return planet.name.toLowerCase().includes(filterText.toLowerCase());
  })
    .sort(comparePlanets)
    .map((planet) => (
      <tr key={ planet.name }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
