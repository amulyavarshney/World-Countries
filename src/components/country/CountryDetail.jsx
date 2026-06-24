import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchByCode } from '../../api/countries';
import {
  formatPopulation,
  formatCurrencies,
  formatLanguages,
  formatNativeName,
  formatTLD,
} from '../../utils/formatters';
import Badge from '../ui/Badge';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

export default function CountryDetail({ cca3 }) {
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setStatus('loading');
    fetchByCode(cca3)
      .then(data => {
        if (!data) { setStatus('error'); setError('Country not found'); return; }
        setCountry(data);
        setStatus('success');
        document.title = `${data.name?.common || cca3} — World Countries`;
      })
      .catch(err => { setStatus('error'); setError(err.message); });
    return () => { document.title = 'World Countries'; };
  }, [cca3]);

  if (status === 'loading') return <LoadingSpinner size="lg" />;
  if (status === 'error') return <ErrorMessage message={error} onRetry={() => setStatus('loading')} />;
  if (!country) return null;

  const name = country.name?.common;
  const nativeName = formatNativeName(country.name?.nativeName);
  const languages = formatLanguages(country.languages);
  const currencies = formatCurrencies(country.currencies);
  const borders = country.borders || [];

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="glass glass-hover px-5 py-2 rounded-xl text-white font-medium text-sm mb-8 transition-all duration-200 cursor-pointer flex items-center gap-2"
      >
        ← Back
      </button>

      <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl">
        {/* Flag */}
        <div className="aspect-video sm:aspect-[2/1] overflow-hidden">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.flags?.alt || `Flag of ${name}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <h1 className="text-white font-bold text-3xl sm:text-4xl mb-2 text-shadow">{name}</h1>
          {nativeName && nativeName !== name && (
            <p className="text-white/50 text-lg mb-6">Native: {nativeName}</p>
          )}

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-3 mb-8">
            <DetailRow label="Population" value={formatPopulation(country.population)} />
            <DetailRow label="Region" value={country.region} />
            <DetailRow label="Subregion" value={country.subregion} />
            <DetailRow label="Capital" value={country.capital?.join(', ')} />
            <DetailRow label="Top Level Domain" value={formatTLD(country.tld)} />
            <DetailRow label="UN Member" value={country.unMember ? 'Yes' : 'No'} />
          </div>

          {languages.length > 0 && (
            <div className="mb-6">
              <p className="text-white/50 text-sm font-medium mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {languages.map(l => <Badge key={l}>{l}</Badge>)}
              </div>
            </div>
          )}

          {currencies.length > 0 && (
            <div className="mb-6">
              <p className="text-white/50 text-sm font-medium mb-2">Currencies</p>
              <div className="flex flex-wrap gap-2">
                {currencies.map(c => <Badge key={c}>{c}</Badge>)}
              </div>
            </div>
          )}

          {borders.length > 0 && (
            <div>
              <p className="text-white/50 text-sm font-medium mb-2">Border Countries</p>
              <div className="flex flex-wrap gap-2">
                {borders.map(code => (
                  <Badge key={code} onClick={() => navigate(`/country/${code}`)}>
                    {code}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-white/50 font-medium">{label}:</span>
      <span className="text-white/80">{value || 'N/A'}</span>
    </div>
  );
}
