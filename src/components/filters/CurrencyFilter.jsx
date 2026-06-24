import { useMemo } from 'react';
import { useCountriesContext } from '../../context/CountriesContext';

export default function CurrencyFilter() {
  const { state, dispatch } = useCountriesContext();

  const currencies = useMemo(() => {
    const set = new Set();
    for (const country of state.allCountries) {
      if (country.currencies) {
        Object.values(country.currencies).forEach(c => {
          if (c.name) set.add(c.name);
        });
      }
    }
    return [...set].sort();
  }, [state.allCountries]);

  return (
    <select
      value={state.filters.currency}
      onChange={e => dispatch({ type: 'SET_FILTER', payload: { currency: e.target.value } })}
      className="glass rounded-xl px-4 py-3 text-white/80 outline-none focus:border-white/40 transition-all duration-200 text-sm cursor-pointer min-w-44"
      aria-label="Filter by currency"
    >
      <option value="">All Currencies</option>
      {currencies.map(c => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}
