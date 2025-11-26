interface LoadingStateProps {
  text?: string;
}

function LoadingState({ text = "در حال بارگذاری..." }: LoadingStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      {/* Spinner Animation */}
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Loading Text */}
      <p className="text-lg text-gray-600 font-estedad-medium animate-pulse">
        {text}
      </p>
    </div>
  );
}

export default LoadingState;
