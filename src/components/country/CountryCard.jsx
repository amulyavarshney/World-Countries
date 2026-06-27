import { Link } from 'react-router-dom';
import { formatPopulation, formatLanguages, formatCurrencies } from '../../utils/formatters';
import { useCountriesContext } from '../../context/CountriesContext';

export default function CountryCard({ country }) {
  const { toggle, isFavorite } = useCountriesContext();
  const name = country.name?.common || 'Unknown';
  const capital = country.capital?.[0] || '—';
  const languages = formatLanguages(country.languages).slice(0, 2);
  const currencies = formatCurrencies(country.currencies).slice(0, 1);
  const flagSrc = country.flags?.png || country.flags?.svg;
  const flagAlt = country.flags?.alt || `Flag of ${name}`;
  const starred = isFavorite(country.cca3);

  return (
    <article className="glass rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] group">
      {/* Flag */}
      <div className="relative aspect-[3/2] overflow-hidden bg-white/5">
        <img
          src={flagSrc}
          alt={flagAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML =
              `<span style="display:flex;align-items:center;justify-content:center;height:100%;font-size:3.5rem">${country.flag || '🏳️'}</span>`;
          }}
        />
        {/* Favorite button */}
        <button
          onClick={e => { e.preventDefault(); toggle(country.cca3); }}
          aria-label={starred ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
          className="absolute top-2 right-2 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-150 cursor-pointer"
          style={{
            background: starred ? 'rgba(251,191,36,0.25)' : 'rgba(0,0,0,0.35)',
            border: starred ? '1px solid rgba(251,191,36,0.50)' : '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill={starred ? '#fbbf24' : 'none'} stroke={starred ? '#fbbf24' : 'rgba(255,255,255,0.7)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div>
          <h2 className="text-white font-semibold text-[17px] tracking-[-0.02em] mb-0.5">{name}</h2>
          <p className="text-white/40 text-[12px] font-medium uppercase tracking-[0.06em]">{country.region || ''}</p>
        </div>

        <dl className="space-y-[6px] flex-1">
          {country.population > 0 && (
            <Row label="Population" value={formatPopulation(country.population)} />
          )}
          <Row label="Capital" value={capital} />
          {languages.length > 0 && (
            <Row label="Language" value={languages.join(', ') + (Object.keys(country.languages || {}).length > 2 ? '…' : '')} />
          )}
          {currencies.length > 0 && (
            <Row label="Currency" value={currencies[0]} />
          )}
        </dl>

        <Link
          to={`/country/${country.cca3}`}
          className="btn-accent block text-center py-[9px] px-4 rounded-[10px] text-[13px] font-medium"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between items-baseline gap-3 text-[13px]">
      <dt className="text-white/40 font-medium shrink-0">{label}</dt>
      <dd className="text-white/80 text-right truncate">{value}</dd>
    </div>
  );
}
