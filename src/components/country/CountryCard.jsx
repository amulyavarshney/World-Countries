import { Link } from 'react-router-dom';
import { formatPopulation, formatLanguages, formatCurrencies } from '../../utils/formatters';

export default function CountryCard({ country }) {
  const name = country.name?.common || 'Unknown';
  const capital = country.capital?.[0] || 'N/A';
  const languages = formatLanguages(country.languages).slice(0, 2);
  const currencies = formatCurrencies(country.currencies).slice(0, 1);

  // Use PNG as primary — more reliable across browsers than SVG from flagcdn.com
  const flagSrc = country.flags?.png || country.flags?.svg;
  const flagAlt = country.flags?.alt || `Flag of ${name}`;

  return (
    <article className="glass glass-hover rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="aspect-video overflow-hidden bg-white/5 flex items-center justify-center">
        <img
          src={flagSrc}
          alt={flagAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement.innerHTML =
              `<span style="font-size:3rem;line-height:1">${country.flag || '🏳️'}</span>`;
          }}
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h2 className="text-white font-bold text-lg leading-tight text-shadow">{name}</h2>

        <dl className="space-y-1 text-sm flex-1">
          <div className="flex gap-1">
            <dt className="text-white/50 font-medium">Population:</dt>
            <dd className="text-white/80">{formatPopulation(country.population)}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-white/50 font-medium">Region:</dt>
            <dd className="text-white/80">{country.region || 'N/A'}</dd>
          </div>
          <div className="flex gap-1">
            <dt className="text-white/50 font-medium">Capital:</dt>
            <dd className="text-white/80">{capital}</dd>
          </div>
          {languages.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              <dt className="text-white/50 font-medium">Languages:</dt>
              <dd className="text-white/80">{languages.join(', ')}{Object.keys(country.languages || {}).length > 2 ? '…' : ''}</dd>
            </div>
          )}
          {currencies.length > 0 && (
            <div className="flex gap-1">
              <dt className="text-white/50 font-medium">Currency:</dt>
              <dd className="text-white/80">{currencies[0]}</dd>
            </div>
          )}
        </dl>

        <Link
          to={`/country/${country.cca3}`}
          className="mt-2 block text-center glass glass-hover px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200 border border-white/20"
        >
          View More →
        </Link>
      </div>
    </article>
  );
}
