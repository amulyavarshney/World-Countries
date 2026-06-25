export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex justify-center py-24">
      <div className="glass rounded-2xl px-10 py-8 text-center max-w-sm">
        <p className="text-white font-semibold text-[17px] tracking-[-0.01em] mb-1">Something went wrong</p>
        <p className="text-white/40 text-[13px] mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-accent px-5 py-[8px] rounded-full text-[13px] cursor-pointer"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
