function SuccessToast({ message }: { message: string }) {
  return (
    <div className="bg-white/95 backdrop-blur-md border border-green-500/60 rounded-xl shadow-lg px-4 py-3.5 flex items-center gap-3 min-w-[320px] max-w-md group hover:shadow-xl transition-all duration-300">
      {/* Icon Container */}
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center border border-green-300">
        <svg
          className="w-5 h-5 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
</svg>
      </div>

      {/* Message */}
      <p className="flex-1 text-sm font-estedad-medium text-green-700 leading-relaxed">
{message}
      </p>
    </div>
  );
}

export default SuccessToast;
