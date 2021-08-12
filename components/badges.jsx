export function BadgeWithColorOnActive({ isActive, children }) {
  return (
    <div className="w-16 sm:w-20 flex sm:justify-center">
      <span
        className={`inline-flex flex-grow-0 items-center justify-between px-3 py-0.5 rounded-full text-sm font-medium bg-lavender dark:bg-green-custom border dark:border-lavender dark:text-lavender text-green-custom transition duration-150 space-x-1 ${
          children < 100 && "min-w-[3.5rem]"
        } ${children >= 100 && children < 1000 && "min-w-[4.2rem]"} ${
          children >= 1000 && "min-w-[4.6rem]"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          className={`fill-current ${
            isActive
              ? "text-green-custom dark:text-yellow-200 transition duration-150"
              : "text-red-900"
          }`}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="12" />
        </svg>
        <p className="pt-1">{children}</p>
      </span>
    </div>
  )
}
