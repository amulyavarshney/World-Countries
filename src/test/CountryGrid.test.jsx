import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CountriesProvider } from '../context/CountriesContext';
import CountryGrid from '../components/country/CountryGrid';
import { mockCountries } from './fixtures';

function renderGrid(props) {
  return render(
    <MemoryRouter>
      <CountriesProvider>
        <CountryGrid {...props} />
      </CountriesProvider>
    </MemoryRouter>
  );
}

describe('CountryGrid', () => {
  it('renders a card for each country', () => {
    renderGrid({ countries: mockCountries, status: 'success', error: null });
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });

  it('shows loading spinner when status is loading', () => {
    renderGrid({ countries: [], status: 'loading', error: null });
    // Spinner is a div, not an article
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    // The spinner container should be present
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('shows error message when status is error', () => {
    renderGrid({ countries: [], status: 'error', error: 'Network failure' });
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Network failure')).toBeInTheDocument();
  });

  it('shows empty state when no countries found', () => {
    renderGrid({ countries: [], status: 'success', error: null });
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('renders country names in cards', () => {
    renderGrid({ countries: mockCountries, status: 'success', error: null });
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();
    expect(screen.getByText('Egypt')).toBeInTheDocument();
  });
});
