const Loader = ({
  fullScreen = false,
  text = "Loading...",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullScreen
          ? "fixed inset-0 bg-slate-900 z-50"
          : "w-full py-10"
      }`}
    >
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin"></div>

      {/* Loading Text */}
      <p className="text-white text-lg font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;