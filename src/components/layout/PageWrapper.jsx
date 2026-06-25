export default function PageWrapper({ children, className = '' }) {
  return (
    <div className={`max-w-[1200px] mx-auto px-6 py-10 ${className}`}>
      {children}
    </div>
  );
}
