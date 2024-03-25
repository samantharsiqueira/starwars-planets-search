import { useContext, useState } from 'react';
import PlanetsContext, { Planets } from '../context/PlanetsContext';
import Table from './Table';

function NumberFilter() {
  const { planets } = useContext(PlanetsContext); // Esse fica imutavel, o array original
  const [filterColumn, setFilterColumn] = useState<string>(''); // Dropdown de coluna
  const [filterComparison, setFilterComparison] = useState<string>(''); // Maior que, menor que, igua
  const [filteredValue, setFilteredValue] = useState<string>('');
  const [filteredPlanets, setFilteredPlanets] = useState<Planets[]>([]); // Esse armazena os planetas filtrados

  // Filter the planets based on the selected column, comparison and value
  const handleColumn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterColumn(event.target.value);
  };

  const handleComparison = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterComparison(event.target.value);
  };

  const handleFilteredValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredValue(event.target.value);
  };

  const applyFilter = (planet: Planets) => {
    const filter = {
      column: filterColumn,
      comparison: filterComparison,
      value: filteredValue,
    };
    if (!filterColumn || !filterComparison || !filteredValue) {
      return true; // Retorna true se nenhum filtro estiver definido
    }

    // Verifica se o planeta atende aos critérios de todos os filtros
    return Object.entries(planet).every(([column, columnValue]) => {
      if (typeof columnValue === 'string' || typeof columnValue === 'number') {
        const planetValue = parseFloat(columnValue);
        const number = parseFloat(filteredValue);

        if (filterComparison === 'Maior que') {
          return planetValue > number;
        }
        if (filterComparison === 'Menor que') {
          return planetValue < number;
        }
        if (filterComparison === 'Igual a') {
          return planetValue === number;
        }
      }
      return true; // Retorna true por padrão se nenhuma comparação válida for selecionada
    });
  };

  // button filter
  const handleApplyFilter = () => {
    const filterPlanets = planets.filter(applyFilter);
    setFilteredPlanets(filterPlanets);
  };

  return (
    <div>
      <select
        value={ filterColumn }
        onChange={ handleColumn }
        data-testid="column-filter"
      >
        <option value="population">População</option>
        <option value="orbital_period">Período Orbital</option>
        <option value="diameter">Diametro</option>
        <option value="surface_water">Superficie Aquatica</option>
      </select>
      <select
        value={ filterComparison }
        onChange={ handleComparison }
        data-testid="comparison-filter"
      >
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="igual a">Igual a</option>
      </select>

      <input
        type="text"
        value={ filteredValue }
        onChange={ handleFilteredValue }
        placeholder="Digite um valor"
        data-testid="value-filter"
      />

      <button onClick={ handleApplyFilter } data-testid="button-filter">
        Aplicar Filtro
      </button>
      <Table />
    </div>
  );
}

export default NumberFilter;
