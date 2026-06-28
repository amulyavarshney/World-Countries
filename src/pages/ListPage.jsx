import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCountries } from '../hooks/useCountries';
import { useCountriesContext } from '../context/CountriesContext';
import CountryGrid from '../components/country/CountryGrid';
import SearchBar from '../components/filters/SearchBar';
import RegionFilter from '../components/filters/RegionFilter';
import LanguageFilter from '../components/filters/LanguageFilter';
import CurrencyFilter from '../components/filters/CurrencyFilter';
import SortControl from '../components/filters/SortControl';
import PageWrapper from '../components/layout/PageWrapper';

export default function ListPage() {
  const { countries, status, error, filters, sort } = useCountries();
  const { dispatch, isFavorite } = useCountriesContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [favOnly, setFavOnly] = useState(false);
  const [didInit, setDidInit] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  useEffect(() => { document.title = 'World Countries'; }, []);

  // On first mount, hydrate context from URL params
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const region = searchParams.get('region') || '';
    const language = searchParams.get('language') || '';
    const currency = searchParams.get('currency') || '';
    const sortParam = searchParams.get('sort') || 'name-asc';
    if (q || region || language || currency) {
      dispatch({ type: 'SET_FILTER', payload: { searchTerm: q, region, language, currency } });
    }
    if (sortParam !== 'name-asc') {
      dispatch({ type: 'SET_SORT', payload: sortParam });
    }
    setDidInit(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Write filters + sort back to URL whenever they change (only after hydration)
  useEffect(() => {
    if (!didInit) return;
    const params = {};
    if (filters.searchTerm) params.q = filters.searchTerm;
    if (filters.region)     params.region = filters.region;
    if (filters.language)   params.language = filters.language;
    if (filters.currency)   params.currency = filters.currency;
    if (sort !== 'name-asc') params.sort = sort;
    setSearchParams(params, { replace: true });
  }, [filters, sort, didInit, setSearchParams]);

  const hasActiveFilters = filters.searchTerm || filters.region || filters.language || filters.currency;
  const activeCount = [filters.region, filters.language, filters.currency].filter(Boolean).length;
  const visibleCountries = favOnly ? countries.filter(c => isFavorite(c.cca3)) : countries;
  const pagedCountries = visibleCountries.slice(0, page * PAGE_SIZE);
  const hasMore = pagedCountries.length < visibleCountries.length;

  // Reset to page 1 whenever the filtered set changes
  const prevVisibleKey = useRef(null);
  const visibleKey = visibleCountries.map(c => c.cca3).join(',');
  if (visibleKey !== prevVisibleKey.current) {
    prevVisibleKey.current = visibleKey;
    if (page !== 1) setPage(1);
  }

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

        {/* Sort */}
        <SortControl />

        {/* Favorites toggle */}
        <button
          onClick={() => setFavOnly(v => !v)}
          aria-pressed={favOnly}
          aria-label="Show favorites only"
          className="flex items-center gap-1.5 px-3 py-[9px] rounded-xl text-[13px] font-medium cursor-pointer transition-all duration-150"
          style={{
            background: favOnly ? 'rgba(251,191,36,0.18)' : 'rgba(255,255,255,0.06)',
            border: favOnly ? '1px solid rgba(251,191,36,0.45)' : '0.5px solid rgba(255,255,255,0.10)',
            color: favOnly ? 'rgba(253,230,138,0.95)' : 'rgba(255,255,255,0.55)',
            fontWeight: favOnly ? '500' : '400',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={favOnly ? '#fbbf24' : 'none'} stroke={favOnly ? '#fbbf24' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Favorites
        </button>

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
      {status === 'success' && visibleCountries.length > 0 && (
        <p className="text-white/20 text-[12px] font-medium uppercase tracking-[0.07em] mb-6">
          {pagedCountries.length.toLocaleString()} of {visibleCountries.length.toLocaleString()} {visibleCountries.length === 1 ? 'country' : 'countries'}
          {favOnly && ' · favorites'}
        </p>
      )}

      <CountryGrid countries={pagedCountries} status={status} error={error} />

      {/* Load more */}
      {status === 'success' && hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setPage(p => p + 1)}
            className="glass glass-hover px-8 py-3 rounded-full text-[14px] font-medium text-white/70 cursor-pointer transition-all duration-150 hover:text-white"
          >
            Load more · {visibleCountries.length - pagedCountries.length} remaining
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
