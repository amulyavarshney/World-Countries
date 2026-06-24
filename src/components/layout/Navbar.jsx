import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [light, setLight] = useState(() => {
    return localStorage.getItem('lightMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('light', light);
    localStorage.setItem('lightMode', light);
  }, [light]);

  return (
    <nav className="sticky top-0 z-50 glass-strong shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-white font-bold text-xl tracking-tight text-shadow hover:text-white/80 transition-colors">
          🌍 World Countries
        </Link>
        <button
          onClick={() => setLight(l => !l)}
          className="glass glass-hover px-4 py-2 rounded-xl text-white/80 text-sm font-medium transition-all duration-200 cursor-pointer"
          aria-label="Toggle light/dark mode"
        >
          {light ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
}
