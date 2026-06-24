import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryDetail from '../components/country/CountryDetail';
import { mockCountries } from './fixtures';
import { _clearCache } from '../api/countries';

// fetchByCode → getAllData() → fetch('/countries.json') → returns array → .find(cca3)
beforeEach(() => {
  _clearCache();
  fetch.mockResolvedValue({ json: async () => mockCountries });
});

function renderDetail(cca3) {
  return render(
    <MemoryRouter>
      <CountryDetail cca3={cca3} />
    </MemoryRouter>
  );
}

describe('CountryDetail', () => {
  it('shows loading spinner initially', () => {
    renderDetail('DEU');
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders country name after loading', async () => {
    renderDetail('DEU');
    await waitFor(() => expect(screen.getByText('Germany')).toBeInTheDocument());
  });

  it('renders native name', async () => {
    renderDetail('DEU');
    await waitFor(() => expect(screen.getByText('Native: Deutschland')).toBeInTheDocument());
  });

  it('renders population', async () => {
    renderDetail('DEU');
    await waitFor(() => {
      const popEl = screen.getByText((_, el) =>
        el?.tagName === 'SPAN' && el.textContent.replace(/[,. ]/g, '') === '82905782'
      );
      expect(popEl).toBeInTheDocument();
    });
  });

  it('renders language badges', async () => {
    renderDetail('DEU');
    await waitFor(() => expect(screen.getByText('German')).toBeInTheDocument());
  });

  it('renders currency badges', async () => {
    renderDetail('DEU');
    await waitFor(() => expect(screen.getByText('Euro')).toBeInTheDocument());
  });

  it('renders border country badges', async () => {
    renderDetail('DEU');
    await waitFor(() => {
      expect(screen.getByText('AUT')).toBeInTheDocument();
      expect(screen.getByText('BEL')).toBeInTheDocument();
      expect(screen.getByText('FRA')).toBeInTheDocument();
    });
  });

  it('renders the Back button', async () => {
    renderDetail('DEU');
    await waitFor(() => expect(screen.getByText('← Back')).toBeInTheDocument());
  });

  it('shows error when country not found (ZZZ not in mock data)', async () => {
    renderDetail('ZZZ');
    await waitFor(() => expect(screen.getByText('Country not found')).toBeInTheDocument());
  });

  it('updates document title after loading', async () => {
    renderDetail('DEU');
    await waitFor(() => expect(document.title).toBe('Germany — World Countries'));
  });
});
