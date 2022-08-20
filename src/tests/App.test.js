import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/provider';
import userEvent from '@testing-library/user-event';

test('I am your test', () => {
  render(
  <PlanetsProvider>
  <App />
  </PlanetsProvider>
  );
  const nameFilter = screen.getByTestId('name-filter');
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');
  expect(nameFilter).toBeInTheDocument();
  expect(columnFilter).toBeInTheDocument();
  expect(comparisonFilter).toBeInTheDocument();
  expect(valueFilter).toBeInTheDocument();
  expect(buttonFilter).toBeInTheDocument();
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByRole('button', {  name: /remover todas filtragens/i})).toBeInTheDocument();
  userEvent.click(buttonFilter)
});
