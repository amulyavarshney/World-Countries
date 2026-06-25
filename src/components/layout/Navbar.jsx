import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [light, setLight] = useState(() => localStorage.getItem('lightMode') === 'true');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', light);
    localStorage.setItem('lightMode', light);
  }, [light]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: light
          ? scrolled ? 'rgba(245,245,247,0.82)' : 'rgba(245,245,247,0.60)'
          : scrolled ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0.50)',
        backdropFilter: 'blur(24px) saturate(200%)',
        WebkitBackdropFilter: 'blur(24px) saturate(200%)',
        borderBottom: light
          ? '0.5px solid rgba(0,0,0,0.10)'
          : '0.5px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-[52px] flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <span className="text-[20px] leading-none select-none">🌍</span>
          <span
            className="font-semibold text-[15px] tracking-[-0.02em] transition-opacity duration-150 group-hover:opacity-60"
            style={{ color: light ? '#1d1d1f' : '#f5f5f7' }}
          >
            World Countries
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setLight(l => !l)}
            aria-label="Toggle light/dark mode"
            className="flex items-center gap-1.5 px-3 h-[30px] rounded-full text-[12px] font-medium tracking-[-0.01em] cursor-pointer transition-all duration-150 select-none"
            style={{
              background: light ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.10)',
              color: light ? '#3a3a3c' : '#aeaeb2',
              border: light ? '0.5px solid rgba(0,0,0,0.10)' : '0.5px solid rgba(255,255,255,0.12)',
            }}
          >
            <span className="text-[13px]">{light ? '🌙' : '☀️'}</span>
            <span>{light ? 'Dark' : 'Light'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
