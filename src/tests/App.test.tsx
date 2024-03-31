import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from '../App';
import testMock from '../mocks/mockTest';
import { vi } from "vitest";
import userEvent from '@testing-library/user-event';
import PlanetsProvider from '../context/PlanetsProvider';
import Table from '../components/Table';

test('I am your test', () => {
  const I = "your father";
  expect(I).toBe("your father");
});

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
  // Arange
  render (<App />);
 const columnSelect = screen.getByTestId('column-filter');
 const comparisonSelect = screen.getByTestId('comparison-filter');
 const valueInput = screen.getByTestId('value-filter');
 const filterButton = screen.getByText('Filter');
 const removeFiltersButton = screen.getByText('Remover filtros');

// Assert
 expect(columnSelect).toBeInTheDocument();
 expect(comparisonSelect).toBeInTheDocument();
 expect(valueInput).toBeInTheDocument();
 expect(filterButton).toBeInTheDocument();
 expect(removeFiltersButton).toBeInTheDocument();
  
});
});
