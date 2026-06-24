import { useMemo } from 'react';
import { useCountriesContext } from '../../context/CountriesContext';

export default function LanguageFilter() {
  const { state, dispatch } = useCountriesContext();

  const languages = useMemo(() => {
    const set = new Set();
    for (const country of state.allCountries) {
      if (country.languages) {
        Object.values(country.languages).forEach(l => set.add(l));
      }
    }
    return [...set].sort();
  }, [state.allCountries]);

  return (
    <select
      value={state.filters.language}
      onChange={e => dispatch({ type: 'SET_FILTER', payload: { language: e.target.value } })}
      className="glass rounded-xl px-4 py-3 text-white/80 outline-none focus:border-white/40 transition-all duration-200 text-sm cursor-pointer min-w-40"
      aria-label="Filter by language"
    >
      <option value="">All Languages</option>
      {languages.map(l => (
        <option key={l} value={l}>{l}</option>
      ))}
    </select>
  );
}
