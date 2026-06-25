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

  useEffect(() => { document.title = 'World Countries'; }, []);

  const hasActiveFilters = filters.searchTerm || filters.region || filters.language || filters.currency;
  const activeCount = [filters.region, filters.language, filters.currency].filter(Boolean).length;

  return (
    <PageWrapper>
      {/* Hero */}
      <div className="mb-8">
        <h1 className="text-white font-bold text-[40px] sm:text-[52px] tracking-[-0.04em] leading-none mb-2">
          World Countries
        </h1>
        <p className="text-white/40 text-[15px] tracking-[-0.01em]">
          Browse, search, and explore every country on Earth.
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {/* Search — takes remaining space */}
        <SearchBar />

        {/* Divider */}
        <div
          className="hidden sm:block h-5 w-px mx-1 shrink-0"
          style={{ background: 'rgba(255,255,255,0.10)' }}
          aria-hidden="true"
        />

        {/* Filter chips — grouped */}
        <div
          className="filter-group flex items-center gap-1 p-1 rounded-[13px]"
          style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.08)' }}
        >
          <RegionFilter />
          <LanguageFilter />
          <CurrencyFilter />
        </div>

        {/* Active filter count + clear */}
        {hasActiveFilters && (
          <button
            onClick={() => dispatch({ type: 'RESET_FILTERS' })}
            className="flex items-center gap-1.5 px-3 py-[9px] rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-150"
            style={{
              background: 'rgba(239,68,68,0.12)',
              border: '0.5px solid rgba(239,68,68,0.25)',
              color: 'rgba(252,165,165,0.90)',
            }}
          >
            {activeCount > 0 && (
              <span
                className="flex items-center justify-center w-[16px] h-[16px] rounded-full text-[10px] font-bold"
                style={{ background: 'rgba(239,68,68,0.30)' }}
              >
                {activeCount}
              </span>
            )}
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      {status === 'success' && countries.length > 0 && (
        <p className="text-[12px] font-medium uppercase tracking-[0.07em] mb-6"
           style={{ color: 'rgba(255,255,255,0.20)' }}>
          {countries.length.toLocaleString()} {countries.length === 1 ? 'country' : 'countries'}
        </p>
      )}

      <CountryGrid countries={countries} status={status} error={error} />
    </PageWrapper>
  );
}
