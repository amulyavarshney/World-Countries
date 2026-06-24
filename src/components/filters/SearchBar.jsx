import { useState, useEffect } from 'react';
import { useCountriesContext } from '../../context/CountriesContext';
import { useDebounce } from '../../hooks/useDebounce';

export default function SearchBar() {
  const { state, dispatch } = useCountriesContext();
  const [value, setValue] = useState(state.filters.searchTerm);
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    dispatch({ type: 'SET_FILTER', payload: { searchTerm: debounced } });
  }, [debounced, dispatch]);

  return (
    <div className="relative flex-1 min-w-64">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Search for a country…"
        className="w-full glass rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 outline-none focus:border-white/40 transition-all duration-200 text-sm"
        aria-label="Search countries by name"
      />
    </div>
  );
}
