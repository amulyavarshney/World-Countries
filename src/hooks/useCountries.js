import { useEffect } from 'react';
import { useCountriesContext } from '../context/CountriesContext';

export function useCountries() {
  const { state, dispatch } = useCountriesContext();
  const { filters, allCountries, status } = state;

  useEffect(() => {
    if (allCountries.length === 0 && status !== 'success') return;

    const { searchTerm, region, language, currency } = filters;
    const hasFilters = region || language || currency || searchTerm.length >= 2;

    if (!hasFilters) {
      dispatch({ type: 'SET_COUNTRIES', payload: allCountries });
      return;
    }

    const q = searchTerm.toLowerCase();
    const filtered = allCountries.filter(c => {
      if (searchTerm.length >= 2) {
        const matchesName =
          c.name.common.toLowerCase().includes(q) ||
          c.name.official.toLowerCase().includes(q);
        if (!matchesName) return false;
      }
      if (region && c.region !== region) return false;
      if (language) {
        const langs = c.languages ? Object.values(c.languages) : [];
        if (!langs.some(l => l.toLowerCase() === language.toLowerCase())) return false;
      }
      if (currency) {
        const curs = c.currencies ? Object.values(c.currencies) : [];
        if (!curs.some(cur => cur.name?.toLowerCase() === currency.toLowerCase())) return false;
      }
      return true;
    });

    dispatch({ type: 'SET_COUNTRIES', payload: filtered });
  }, [filters, allCountries, status, dispatch]);

  return state;
}
