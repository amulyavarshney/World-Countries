import { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchAllCountries } from '../api/countries';

const CountriesContext = createContext(null);

const initialState = {
  countries: [],
  allCountries: [],
  status: 'idle',
  error: null,
  filters: {
    searchTerm: '',
    region: '',
    language: '',
    currency: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, status: 'loading', error: null };
    case 'SET_COUNTRIES':
      return { ...state, status: 'success', countries: action.payload };
    case 'SET_ALL_COUNTRIES':
      return { ...state, allCountries: action.payload, countries: action.payload, status: 'success' };
    case 'SET_ERROR':
      return { ...state, status: 'error', error: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters, countries: state.allCountries };
    default:
      return state;
  }
}

export function CountriesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all countries once on mount
  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    fetchAllCountries()
      .then(data => dispatch({ type: 'SET_ALL_COUNTRIES', payload: data }))
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.message }));
  }, []);

  return (
    <CountriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountriesContext() {
  const ctx = useContext(CountriesContext);
  if (!ctx) throw new Error('useCountriesContext must be used within CountriesProvider');
  return ctx;
}
