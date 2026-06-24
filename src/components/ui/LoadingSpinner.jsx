export default function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'w-6 h-6', md: 'w-12 h-12', lg: 'w-20 h-20' };
  return (
    <div className="flex justify-center items-center py-20">
      <div
        className={`${sizes[size]} rounded-full border-4 border-white/20 border-t-white animate-spin`}
      />
    </div>
  );
}
