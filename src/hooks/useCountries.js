import { useEffect } from 'react';
import { useCountriesContext } from '../context/CountriesContext';

function applySortInPlace(arr, sort) {
  switch (sort) {
    case 'name-asc':  arr.sort((a, b) => a.name.common.localeCompare(b.name.common)); break;
    case 'name-desc': arr.sort((a, b) => b.name.common.localeCompare(a.name.common)); break;
    case 'pop-asc':   arr.sort((a, b) => (a.population ?? 0) - (b.population ?? 0)); break;
    case 'pop-desc':  arr.sort((a, b) => (b.population ?? 0) - (a.population ?? 0)); break;
  }
  return arr;
}

export function useCountries() {
  const { state, dispatch } = useCountriesContext();
  const { filters, sort, allCountries, status } = state;

  useEffect(() => {
    if (allCountries.length === 0 && status !== 'success') return;

    const { searchTerm, region, language, currency } = filters;
    const hasFilters = region || language || currency || searchTerm.length >= 2;

    let result;
    if (!hasFilters) {
      result = [...allCountries];
    } else {
      const q = searchTerm.toLowerCase();
      result = allCountries.filter(c => {
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
    }

    applySortInPlace(result, sort);
    dispatch({ type: 'SET_COUNTRIES', payload: result });
  }, [filters, sort, allCountries, status, dispatch]);

  return state;
}
