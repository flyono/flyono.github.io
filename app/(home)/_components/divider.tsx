export function Divider() {
  return (
    <div className="w-24 mx-auto animate-fade-in-up delay-150">
      <svg
        viewBox="0 0 100 20"
        className="w-full h-auto text-stone-200 dark:text-stone-800"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M0 10 Q 25 0, 50 10 T 100 10" />
      </svg>
    </div>
  );
}
