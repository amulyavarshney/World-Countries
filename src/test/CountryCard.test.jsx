import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../components/country/CountryCard';
import { mockGermany, mockJapan } from './fixtures';

function renderCard(country) {
  return render(
    <MemoryRouter>
      <CountryCard country={country} />
    </MemoryRouter>
  );
}

describe('CountryCard', () => {
  it('renders the country name', () => {
    renderCard(mockGermany);
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('renders the flag image with alt text', () => {
    renderCard(mockGermany);
    const img = screen.getByAltText('Flag of Germany');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://flagcdn.com/w320/de.png');
  });

  it('renders population formatted with digit separators', () => {
    renderCard(mockGermany);
    // toLocaleString format varies by environment; match the digits regardless of separator
    const popEl = screen.getByText((_, el) =>
      el?.tagName === 'DD' && el.textContent.replace(/[,. ]/g, '') === '82905782'
    );
    expect(popEl).toBeInTheDocument();
  });

  it('renders region', () => {
    renderCard(mockGermany);
    expect(screen.getByText('Europe')).toBeInTheDocument();
  });

  it('renders capital', () => {
    renderCard(mockGermany);
    expect(screen.getByText('Berlin')).toBeInTheDocument();
  });

  it('renders languages', () => {
    renderCard(mockGermany);
    expect(screen.getByText('German')).toBeInTheDocument();
  });

  it('renders currency', () => {
    renderCard(mockGermany);
    expect(screen.getByText('Euro')).toBeInTheDocument();
  });

  it('renders a View Details link pointing to the correct route', () => {
    renderCard(mockGermany);
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toHaveAttribute('href', '/country/DEU');
  });

  it('shows em-dash for missing capital', () => {
    const country = { ...mockJapan, capital: undefined };
    renderCard(country);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('hides population row when population is 0', () => {
    const country = { ...mockJapan, population: 0 };
    renderCard(country);
    expect(screen.queryByText('Population')).not.toBeInTheDocument();
  });
});
