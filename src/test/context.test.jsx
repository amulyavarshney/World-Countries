import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CountriesProvider, useCountriesContext } from '../context/CountriesContext';
import { mockCountries } from './fixtures';

// Mock the whole api module so the _cache singleton doesn't bleed between tests
vi.mock('../api/countries', () => ({
  fetchAllCountries: vi.fn(),
}));

import { fetchAllCountries } from '../api/countries';

function CountriesDisplay() {
  const { state } = useCountriesContext();
  return (
    <div>
      <span data-testid="status">{state.status}</span>
      <span data-testid="count">{state.countries.length}</span>
      <span data-testid="all-count">{state.allCountries.length}</span>
      <span data-testid="search">{state.filters.searchTerm}</span>
    </div>
  );
}

function FilterDispatcher() {
  const { dispatch } = useCountriesContext();
  return (
    <button onClick={() => dispatch({ type: 'SET_FILTER', payload: { searchTerm: 'test' } })}>
      Set Filter
    </button>
  );
}

describe('CountriesContext', () => {
  it('starts in loading status while fetching', () => {
    fetchAllCountries.mockResolvedValue(mockCountries);
    render(<CountriesProvider><CountriesDisplay /></CountriesProvider>);
    expect(screen.getByTestId('status').textContent).toBe('loading');
  });

  it('transitions to success after data loads', async () => {
    fetchAllCountries.mockResolvedValue(mockCountries);
    render(<CountriesProvider><CountriesDisplay /></CountriesProvider>);
    await waitFor(() => expect(screen.getByTestId('status').textContent).toBe('success'));
  });

  it('populates allCountries and countries from initial fetch', async () => {
    fetchAllCountries.mockResolvedValue(mockCountries);
    render(<CountriesProvider><CountriesDisplay /></CountriesProvider>);
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('4');
      expect(screen.getByTestId('all-count').textContent).toBe('4');
    });
  });

  it('SET_FILTER updates the filter value', async () => {
    fetchAllCountries.mockResolvedValue(mockCountries);
    render(
      <CountriesProvider>
        <CountriesDisplay />
        <FilterDispatcher />
      </CountriesProvider>
    );
    await waitFor(() => expect(screen.getByTestId('status').textContent).toBe('success'));
    act(() => screen.getByRole('button').click());
    expect(screen.getByTestId('search').textContent).toBe('test');
  });

  it('transitions to error status on fetch failure', async () => {
    fetchAllCountries.mockRejectedValue(new Error('Network error'));
    render(<CountriesProvider><CountriesDisplay /></CountriesProvider>);
    await waitFor(() => expect(screen.getByTestId('status').textContent).toBe('error'));
  });

  it('throws when used outside provider', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<CountriesDisplay />)).toThrow();
    consoleSpy.mockRestore();
  });
});
