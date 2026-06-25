export default function Badge({ children, onClick, className = '' }) {
  const base = `inline-flex items-center px-3 py-[5px] rounded-full text-[12px] font-medium tracking-[-0.01em] border transition-all duration-150 ${className}`;

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${base} glass glass-hover text-white/70 border-white/10 cursor-pointer hover:text-white`}
      >
        {children}
      </button>
    );
  }
  return (
    <span className={`${base} glass text-white/70 border-white/10`}>
      {children}
    </span>
  );
}
