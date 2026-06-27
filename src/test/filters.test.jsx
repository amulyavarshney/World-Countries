import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CountriesProvider } from '../context/CountriesContext';
import SearchBar from '../components/filters/SearchBar';
import RegionFilter from '../components/filters/RegionFilter';
import { REGIONS } from '../utils/constants';

function renderWithProvider(ui) {
  return render(<CountriesProvider>{ui}</CountriesProvider>);
}

describe('SearchBar', () => {
  it('renders a text input', () => {
    renderWithProvider(<SearchBar />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates input value on typing', async () => {
    const user = userEvent.setup();
    renderWithProvider(<SearchBar />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'France');
    expect(input).toHaveValue('France');
  });

  it('has correct placeholder text', () => {
    renderWithProvider(<SearchBar />);
    expect(screen.getByPlaceholderText('Search countries…')).toBeInTheDocument();
  });
});

describe('RegionFilter', () => {
  it('renders a select element', () => {
    renderWithProvider(<RegionFilter />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows "Region" as default option', () => {
    renderWithProvider(<RegionFilter />);
    expect(screen.getByDisplayValue('Region')).toBeInTheDocument();
  });

  it('renders all region options', () => {
    renderWithProvider(<RegionFilter />);
    for (const region of REGIONS) {
      expect(screen.getByRole('option', { name: region })).toBeInTheDocument();
    }
  });

  it('updates value when region is selected', async () => {
    const user = userEvent.setup();
    renderWithProvider(<RegionFilter />);
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Europe');
    expect(select).toHaveValue('Europe');
  });
});
