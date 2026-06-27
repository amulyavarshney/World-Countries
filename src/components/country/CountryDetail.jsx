import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchByCode } from '../../api/countries';
import { useCountriesContext } from '../../context/CountriesContext';
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
  const { state } = useCountriesContext();

  const cca3ToName = useMemo(() => {
    const map = {};
    for (const c of state.allCountries) map[c.cca3] = c.name?.common;
    return map;
  }, [state.allCountries]);

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
  const flagSrc = country.flags?.png || country.flags?.svg;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="glass glass-hover flex items-center gap-1.5 px-4 py-[7px] rounded-full text-[13px] font-medium text-white/80 mb-8 cursor-pointer transition-all duration-150"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back
      </button>

      <div className="glass-strong rounded-3xl overflow-hidden">
        {/* Flag hero */}
        <div className="aspect-[2/1] overflow-hidden">
          <img
            src={flagSrc}
            alt={country.flags?.alt || `Flag of ${name}`}
            className="w-full h-full object-cover"
            onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.innerHTML =
                `<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:5rem">${country.flag || '🏳️'}</span>`;
            }}
          />
        </div>

        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white font-bold text-[32px] sm:text-[38px] tracking-[-0.03em] leading-tight mb-1">
              {name}
            </h1>
            {nativeName && nativeName !== name && (
              <p className="text-white/40 text-[15px] tracking-[-0.01em]">{nativeName}</p>
            )}
          </div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4 mb-10 pb-10 border-b border-white/8">
            <Stat label="Population" value={formatPopulation(country.population)} />
            <Stat label="Capital" value={country.capital?.join(', ')} />
            <Stat label="Region" value={country.region} />
            <Stat label="Subregion" value={country.subregion} />
            <Stat label="Top Level Domain" value={formatTLD(country.tld)} />
            <Stat label="UN Member" value={country.unMember ? 'Yes' : 'No'} />
          </div>

          {/* Badges */}
          <div className="space-y-6">
            {languages.length > 0 && (
              <Section label="Languages">
                {languages.map(l => <Badge key={l}>{l}</Badge>)}
              </Section>
            )}
            {currencies.length > 0 && (
              <Section label="Currencies">
                {currencies.map(c => <Badge key={c}>{c}</Badge>)}
              </Section>
            )}
            {borders.length > 0 && (
              <Section label="Borders">
                {borders.map(code => (
                  <Badge key={code} onClick={() => navigate(`/country/${code}`)}>
                    {cca3ToName[code] || code}
                  </Badge>
                ))}
              </Section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.07em] mb-0.5">{label}</p>
      <p className="text-white/90 text-[15px] font-medium tracking-[-0.01em]">{value || '—'}</p>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div>
      <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.07em] mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
