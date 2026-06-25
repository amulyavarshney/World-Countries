import CountryCard from './CountryCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

export default function CountryGrid({ countries, status, error }) {
  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'error') return <ErrorMessage message={error} />;

  if (status === 'success' && countries.length === 0) {
    return (
      <div className="flex justify-center py-24">
        <div className="glass rounded-2xl px-12 py-12 text-center max-w-sm">
          <p className="text-[40px] mb-4">🌐</p>
          <p className="text-white font-semibold text-[17px] tracking-[-0.01em] mb-2">No results</p>
          <p className="text-white/40 text-[13px]">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
}
