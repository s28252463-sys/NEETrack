
export function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center loader-background-animated">
      <div className="relative flex scale-[0.7] cursor-not-allowed items-center justify-center">
        <div className="loader-circle relative flex h-[10em] w-[10em] animate-[rotate_3s_linear_infinite] items-center justify-center rounded-full">
          <div className="loader-intern absolute z-[9999] text-white"></div>
        </div>
      </div>
    </div>
  );
}
