interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function EmptyState({
  title,
  description,
  icon = "fas fa-inbox",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      <div className="text-center space-y-4 max-w-md mx-auto">
        {/* آیکون */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-4">
          <i className={`${icon} text-5xl text-gray-400`}></i>
        </div>

        {/* عنوان */}
        <h3 className="text-2xl font-estedad-semibold text-dark">{title}</h3>

        {/* توضیحات */}
        {description && (
          <p className="text-paragray font-estedad-light text-base">
            {description}
          </p>
        )}

        {/* دکمه اکشن (اختیاری) */}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-deepblue transition-colors duration-300 font-estedad-medium"
          >
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}

export default EmptyState;
