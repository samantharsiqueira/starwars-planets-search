import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import App from '../App';
import testMock from '../mocks/mockTest';
import { vi } from "vitest";
import userEvent from '@testing-library/user-event';
import PlanetsProvider from '../context/PlanetsProvider';
import Table from '../components/Table';

const mockFetch = () => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    json: async () => testMock,
  } as Response);
};

beforeAll(mockFetch);

describe('Table component', () => {
  
test('Table component works properly', async () => {
   // Arrange
   await act(async () => {
    render(
      <PlanetsProvider>
        <Table />
      </PlanetsProvider>
    );
  });
   const input = await screen.findByRole('textbox');
   const rows= await screen.findAllByRole('row'); // nodelist
   // Act

   // Assert
   expect(input).toBeInTheDocument();
   expect(rows.length).toBeGreaterThan(0);
   expect(rows.length).toBe(11);
});

}); 

describe('Filter component', () => {
test('Filters are being rendered correctly', () => {
  
  render (<App />);
 const columnSelect = screen.getByTestId('column-filter');
 const comparisonSelect = screen.getByTestId('comparison-filter');
 const valueInput = screen.getByTestId('value-filter');
 const filterButton = screen.getByText('Filter');
 const removeFiltersButton = screen.getByText('Remover filtros');

 expect(columnSelect).toBeInTheDocument();
 expect(comparisonSelect).toBeInTheDocument();
 expect(valueInput).toBeInTheDocument();
 expect(filterButton).toBeInTheDocument();
 expect(removeFiltersButton).toBeInTheDocument();
  
});

test('selecting a column updates the column state correctly', () => {
  render(<App />);
  const column = screen.getByTestId('column-filter') as HTMLSelectElement;
  userEvent.selectOptions(column,  'population');  // Simular a seleção de uma opção
  expect(column.value).toBe('population');  // Verificar se a coluna selecionada foi atualizada corretamente
});

test('selecting a comparison option updates the comparison state correctly', () => {
  render(<App />);
  const comparisonSelect = screen.getByTestId('comparison-filter') as HTMLSelectElement;
  userEvent.selectOptions(comparisonSelect, 'maior que');  
  expect(comparisonSelect.value).toBe('maior que');  
  // Como testar o oposto?
  });

  test('applying filters updates filtered planets correctly', async () => {
   
    render(<App />);
  // Compara a coluna com o valor 
    const columnSelect = screen.getByTestId('column-filter') as HTMLSelectElement;
    const comparisonSelect = screen.getByTestId('comparison-filter') as HTMLSelectElement;
    const valueInput = screen.getByTestId('value-filter') as HTMLInputElement;
    const filterButton = screen.getByTestId('button-filter');
  
    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(comparisonSelect, 'maior que');
    fireEvent.change(valueInput, { target: { value: '100000' } });
    fireEvent.click(filterButton);
  
    await act(async () => {});

    const filteredPlanet = screen.getByText('Tatooine');
    expect(filteredPlanet).toBeInTheDocument();

  });
  
  test('removing individual filters works correctly', async () => {
    render(<App />);
// Simula as colunas pra poder testar os filtros delas
  const filters = [
    { column: 'population', comparison: 'maior que', value: '100000' },
    { column: 'orbital_period', comparison: 'menor que', value: '500' },
    { column: 'diameter', comparison: 'igual a', value: '10000' },
  ];

  filters.forEach((filter) => {
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnSelect, filter.column);
    userEvent.selectOptions(comparisonSelect, filter.comparison);
      fireEvent.change(valueInput, { target: { value: filter.value } });
      fireEvent.click(filterButton);

    
  });

  await act(async () => {});

  const removeFiltersButton = screen.getByTestId('button-remove-filters');
  fireEvent.click(removeFiltersButton);

  await act(async () => {});

  // Verificar se todos os filtros foram removidos corretamente
  const filteredPlanets = screen.queryAllByTestId('filter');
  expect(filteredPlanets).toHaveLength(0);
});
  
});

