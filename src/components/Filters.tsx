import React, { useState, useContext } from 'react';
import { FiltersType } from '../types/types';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { planets } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [columnOptions, setColumnOptions] = useState<string[]>([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]); // // Estado para as opções de coluna disponíveis
  const [filters, setFilters] = useState<FiltersType[]>([]); // Estado para os filtros aplicados
  // const [filteredPlanets, setFilteredPlanets] = useState<Planets[]>([]);
  const { setFilteredPlanets } = useContext(PlanetsContext);

  const handleColumnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColumn(event.target.value);
  };

  const handleComparisonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setComparison(event.target.value);
  };

  const handleValueChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const filterbyNumber = () => {
    // Filtra os planetas de acordo com os filtros aplicados
    const filterPlanets = planets.filter((planet) => {
      // Verifica se a coluna selecionada é 'unknown'
      if (planet[column] === 'unknown') {
        return false;
      }

      const planetValue = Number(planet[column]);
      if (comparison === 'maior que') {
        return planetValue > Number(value);
      }
      console.log(planet[column]);
      if (comparison === 'menor que') {
        return planetValue < Number(value);
      }
      if (comparison === 'igual a') {
        return planetValue === Number(value);
      }
      return false;
    });
    return filterPlanets;
  };

  const handleFilter = () => {
    // Armazenando os filtros em um estado
    const newOptions = columnOptions.filter((option) => column !== option); // Remove coluna selecionada
    setColumnOptions(newOptions);

    // Cria um novo filtro com as seleções feitas
    const newFilter = {
      column,
      comparison,
      value,
    };

    // Adiciona o novo filtro à lista de filtros aplicados
    setFilters([...filters, newFilter]);

    // Filtra os planetas
    const newFilteredPlanets = filterbyNumber();
    setFilteredPlanets(newFilteredPlanets);
    console.log(newFilteredPlanets);
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        value={ column }
        onChange={ handleColumnChange }
      >
        {/* Mapeia as opções de coluna disponíveis */}
        { columnOptions.map((option) => (
          <option key={ option } value={ option }>{option}</option> // Cria uma opção para cada coluna disponível
        ))}
      </select>

      <select
        name="comparison"
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ handleComparisonChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        name="value"
        data-testid="value-filter"
        type="number"
        value={ value }
        onChange={ handleValueChange }
      />

      <button data-testid="button-filter" onClick={ handleFilter }>
        Filter
      </button>
    </div>
  );
}

export default Filter;
