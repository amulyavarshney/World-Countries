import { useEffect } from 'react';
import { useCountries } from '../hooks/useCountries';
import { useCountriesContext } from '../context/CountriesContext';
import CountryGrid from '../components/country/CountryGrid';
import SearchBar from '../components/filters/SearchBar';
import RegionFilter from '../components/filters/RegionFilter';
import LanguageFilter from '../components/filters/LanguageFilter';
import CurrencyFilter from '../components/filters/CurrencyFilter';
import PageWrapper from '../components/layout/PageWrapper';

export default function ListPage() {
  const { countries, status, error, filters } = useCountries();
  const { dispatch } = useCountriesContext();

  useEffect(() => {
    document.title = 'World Countries';
  }, []);

  const hasActiveFilters = filters.searchTerm || filters.region || filters.language || filters.currency;

  return (
    <PageWrapper>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        <SearchBar />
        <RegionFilter />
        <LanguageFilter />
        <CurrencyFilter />
        {hasActiveFilters && (
          <button
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="glass glass-hover px-4 py-3 rounded-xl text-white/70 text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Results count */}
      {status === 'success' && (
        <p className="text-white/40 text-sm mb-6">
          {countries.length} {countries.length === 1 ? 'country' : 'countries'} found
        </p>
      )}

      <CountryGrid countries={countries} status={status} error={error} />
    </PageWrapper>
  );
}
