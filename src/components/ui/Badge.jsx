export default function Badge({ children, onClick, className = '' }) {
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`glass glass-hover px-3 py-1 rounded-full text-white/80 text-xs font-medium transition-all duration-200 cursor-pointer border border-white/20 ${className}`}
      >
        {children}
      </button>
    );
  }
  return (
    <span
      className={`glass px-3 py-1 rounded-full text-white/80 text-xs font-medium border border-white/20 ${className}`}
    >
      {children}
    </span>
  );
}
