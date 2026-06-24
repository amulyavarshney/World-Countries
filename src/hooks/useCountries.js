import { useEffect } from 'react';
import { useCountriesContext } from '../context/CountriesContext';
import {
  fetchByName,
  fetchByRegion,
  fetchByLanguage,
  fetchByCurrency,
} from '../api/countries';

export function useCountries() {
  const { state, dispatch } = useCountriesContext();
  const { filters, allCountries, status } = state;

  useEffect(() => {
    // Wait until the base data is loaded
    if (allCountries.length === 0 && status !== 'success') return;

    const { searchTerm, region, language, currency } = filters;

    // No filters — show all countries
    if (!language && !currency && !region && searchTerm.length < 2) {
      dispatch({ type: 'SET_COUNTRIES', payload: allCountries });
      return;
    }

    let apiCall;
    if (language)                    apiCall = fetchByLanguage(language);
    else if (currency)               apiCall = fetchByCurrency(currency);
    else if (region)                 apiCall = fetchByRegion(region);
    else if (searchTerm.length >= 2) apiCall = fetchByName(searchTerm);

    if (!apiCall) return;

    dispatch({ type: 'SET_LOADING' });
    apiCall
      .then(data => dispatch({ type: 'SET_COUNTRIES', payload: data }))
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }));
  }, [filters, allCountries, status, dispatch]);

  return state;
}
