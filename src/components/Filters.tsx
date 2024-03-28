import React, { useState, useContext, useEffect, useRef } from 'react';
import { FiltersType } from '../types/types';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const { planets, setFilteredPlanets } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [columnOptions, setColumnOptions] = useState<string[]>([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]); // // Estado para as opções de coluna disponíveis
  const [filters, setFilters] = useState<FiltersType[]>([]); // Estado para os filtros aplicados

  const columnRef = useRef<HTMLSelectElement>(null);
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
    return planets.filter((planet) => {
      // Filtra os planetas de acordo com os filtros aplicados se atender um deles
      return filters.every((filter) => {
      // Verifica se a coluna selecionada é 'unknown'
        if (planet[filter.column] === 'unknown') {
          return false;
        }
        const planetValue = Number(planet[filter.column]);
        const filterValue = Number(filter.value);

        if (filter.comparison === 'maior que') {
          return planetValue > filterValue;
        }
        console.log(planet[column]);
        if (filter.comparison === 'menor que') {
          return planetValue < filterValue;
        }
        if (filter.comparison === 'igual a') {
          return planetValue === filterValue;
        }
        return false;
      });
    });
  };
  useEffect(() => { setFilteredPlanets(filterbyNumber()); }, [filters]);

  const handleFilter = () => {
    // Armazenando os filtros em um estado
    const newOptions = columnOptions
      .filter((option) => columnRef.current?.value !== option); // Remove coluna selecionada
    setColumnOptions(newOptions);

    // Cria um novo filtro com as seleções feitas
    const newFilter = {
      column: columnRef.current?.value as string,
      comparison,
      value,
    };

    // Adiciona o novo filtro à lista de filtros aplicados
    setFilters([...filters, newFilter]);
  };

  const removeFilter = (filterToRemove: FiltersType) => {
    const updatedFilters = filters.filter((filter) => filter !== filterToRemove);
    setFilters(updatedFilters);
  };

  const removeAllFilters = () => {
    setFilters([]);
    setColumnOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
  };

  return (
    <div>
      <select
        name="column"
        data-testid="column-filter"
        ref={ columnRef }
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

      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover filtros
      </button>

      {/* Renderizar os filtros aplicados */}
      {filters.map((filter) => (
        <div key={ JSON.stringify(filter) } data-testid="filter">
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
          </span>
          <button onClick={ () => removeFilter(filter) }>X</button>
        </div>
      ))}
    </div>
  );
}
export default Filter;
