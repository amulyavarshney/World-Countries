import { useState, useEffect, useRef } from 'react';
import { useCountriesContext } from '../../context/CountriesContext';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchBar() {
  const { state, dispatch } = useCountriesContext();
  const [value, setValue] = useState(state.filters.searchTerm);
  const [focused, setFocused] = useState(false);
  const debounced = useDebounce(value, 300);
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'SET_FILTER', payload: { searchTerm: debounced } });
  }, [debounced, dispatch]);

  // Sync local value when context changes externally (URL hydration or reset)
  useEffect(() => {
    if (state.filters.searchTerm !== value) setValue(state.filters.searchTerm);
  }, [state.filters.searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="relative flex-1 min-w-60 transition-all duration-200"
      style={{ maxWidth: '400px' }}
    >
      {/* Search icon */}
      <svg
        className="search-icon absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-150"
        style={{ color: focused ? 'rgba(99,102,241,0.8)' : 'rgba(255,255,255,0.25)' }}
        width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true"
      >
        <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search countries…"
        aria-label="Search countries by name"
        className="w-full pl-10 pr-8 py-[10px] text-[14px] rounded-xl outline-none transition-all duration-200"
        style={{
          background: focused ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.06)',
          border: focused
            ? '1px solid rgba(99,102,241,0.60)'
            : '0.5px solid rgba(255,255,255,0.10)',
          boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.15)' : 'none',
          color: 'rgba(255,255,255,0.90)',
          caretColor: '#6366f1',
        }}
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => { setValue(''); inputRef.current?.focus(); }}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center justify-center w-[18px] h-[18px] rounded-full cursor-pointer transition-all duration-150"
          style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.60)' }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
