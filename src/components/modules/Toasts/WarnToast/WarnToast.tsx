function WarnToast({ message }: { message: string }) {
  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white/95 to-amber-50/80 backdrop-blur-md border border-amber-500/60 rounded-xl shadow-lg px-4 py-3.5 flex items-center gap-3 min-w-[320px] max-w-md group hover:shadow-xl transition-all duration-300">
      {/* Icon Container */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center border border-amber-300">
        <svg
          className="w-5 h-5 text-amber-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
</svg>
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-estedad-medium text-amber-700 leading-relaxed">
{message}
      </p>
    </div>
  );
}

export default WarnToast;
