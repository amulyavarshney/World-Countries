import { useMemo } from 'react';
import { useCountriesContext } from '../../context/CountriesContext';

export default function CurrencyFilter() {
  const { state, dispatch } = useCountriesContext();
  const active = !!state.filters.currency;

  const currencies = useMemo(() => {
    const set = new Set();
    for (const c of state.allCountries) {
      if (c.currencies) Object.values(c.currencies).forEach(cur => { if (cur.name) set.add(cur.name); });
    }
    return [...set].sort();
  }, [state.allCountries]);

  return (
    <div className="relative">
      <select
        value={state.filters.currency}
        onChange={e => dispatch({ type: 'SET_FILTER', payload: { currency: e.target.value } })}
        aria-label="Filter by currency"
        className="appearance-none pl-3 pr-7 py-[9px] text-[13px] rounded-xl outline-none cursor-pointer transition-all duration-150"
        style={{
          background: active ? 'rgba(99,102,241,0.18)' : 'rgba(255,255,255,0.06)',
          border: active ? '1px solid rgba(99,102,241,0.45)' : '0.5px solid rgba(255,255,255,0.10)',
          color: active ? 'rgba(165,164,255,0.95)' : 'rgba(255,255,255,0.55)',
          fontWeight: active ? '500' : '400',
        }}
      >
        <option value="">Currency</option>
        {currencies.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <ChevronIcon active={active} />
    </div>
  );
}

function ChevronIcon({ active }) {
  return (
    <svg
      className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
      style={{ color: active ? 'rgba(165,164,255,0.7)' : 'rgba(255,255,255,0.30)' }}
      width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"
    >
      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
