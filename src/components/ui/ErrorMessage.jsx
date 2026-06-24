export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="glass rounded-2xl px-8 py-6 text-center max-w-md">
        <p className="text-red-300 text-lg font-medium mb-2">Something went wrong</p>
        <p className="text-white/60 text-sm mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="glass glass-hover px-4 py-2 rounded-xl text-white text-sm font-medium transition-all duration-200 cursor-pointer"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
