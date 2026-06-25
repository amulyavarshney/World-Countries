export default function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-14 h-14' };
  return (
    <div className="flex justify-center items-center py-24">
      <div className={`${sizes[size]} rounded-full border-2 border-white/10 border-t-white/60 animate-spin`} />
    </div>
  );
}
