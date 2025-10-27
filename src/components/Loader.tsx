
export function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="relative flex scale-[0.7] cursor-not-allowed items-center justify-center">
        <div className="loader-central relative flex h-[10em] w-[10em] items-center justify-center rounded-full"></div>
        <div className="loader-external-shadow relative z-[999] flex h-[10em] w-[10em] animate-[rotate_3s_linear_infinite] items-center justify-center rounded-full bg-[#212121]"></div>
        <div className="loader-intern absolute z-[9999] text-white"></div>
      </div>
    </div>
  );
}
