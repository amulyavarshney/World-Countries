import { useCountriesContext } from '../../context/CountriesContext';
import { REGIONS } from '../../utils/constants';

export default function RegionFilter() {
  const { state, dispatch } = useCountriesContext();

  return (
    <select
      value={state.filters.region}
      onChange={e => dispatch({ type: 'SET_FILTER', payload: { region: e.target.value } })}
      className="glass rounded-xl px-4 py-3 text-white/80 outline-none focus:border-white/40 transition-all duration-200 text-sm cursor-pointer min-w-40"
      aria-label="Filter by region"
    >
      <option value="">All Regions</option>
      {REGIONS.map(r => (
        <option key={r} value={r}>{r}</option>
      ))}
    </select>
  );
}
