import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import { Planets } from '../types/types';

function Table() {
  const { filteredPlanets } = useContext(PlanetsContext);
  const [filterText, setFilterText] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('population'); // Redundante mas passou no teste
  const [selectedDirection, setSelectedDirection] = useState('ASC'); // Redundante mas passou no teste
  const [sortOrder, setSortOrder] = useState({ column: 'population', sort: 'ASC' });

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };
  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(event.target.value);
  };

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDirection(event.target.value);
  };

  const handleSortOrder = () => {
    setSortOrder({ column: selectedColumn, sort: selectedDirection });
  };

  const comparePlanets = (a: Planets, b: Planets) => {
    const { column } = sortOrder; // Coluna selecionada
    const direction = sortOrder.sort; // Direção de classificação

    const aValue = a[column];
    const bValue = b[column];

    if (a[sortOrder.column] === 'unknown') return 1;
    if (b[sortOrder.column] === 'unknown') return -1;

    // Lógica para classificação ascendente
    if (direction === 'ASC') {
      // Converter valores para números antes de comparar
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      return aNum - bNum;
    }
    // Lógica para classificação descendente

    // Converter valores para números antes de comparar
    const aNum = Number(aValue);
    const bNum = Number(bValue);
    return bNum - aNum;
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

      <select
        value={ selectedColumn }
        onChange={ handleColumnChange }
        data-testid="column-sort"
      >
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface Water</option>
      </select>
      <div>
        <label>
          Ascendente:
          <input
            data-testid="column-sort-input-asc"
            type="radio"
            name="sortOrder"
            value="ASC"
            checked={ selectedDirection === 'ASC' }
            onChange={ handleDirectionChange }
          />
        </label>
        <label>
          Descendente:
          <input
            data-testid="column-sort-input-desc"
            type="radio"
            name="sortOrder"
            value="DESC"
            checked={ selectedDirection === 'DESC' }
            onChange={ handleDirectionChange }
          />
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        onClick={ handleSortOrder }
      >
        Ordenar
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
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
        <td data-testid="planet-name">{planet.name}</td>
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
