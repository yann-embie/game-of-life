export function StartStopButton({ handleIsRunning, isRunning }) {
  return (
    <button
      className="inline-flex items-center justify-center px-8 pt-4 pb-2 border border-transparent rounded-md shadow-sm text-lavender dark:text-dark-green-custom hover:bg-[#A6ABDD] dark:bg-yellow-500 dark:hover:bg-[#76A3A7] bg-[#76A3A7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender-gray hover:focus:ring-green-custom duration-150 text-2xl uppercase w-36 font-bold tracking-wider align-middle active:transform transition duration-150 active:scale-110"
      onClick={handleIsRunning}
    >
      {isRunning ? "Stop" : "Start"}
    </button>
  )
}

export function CircularButton({ children, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm bg-[#C1D6D7] text-green-custom dark:border-lavender dark:bg-dark-green-custom hover:text-dark-green-custom hover:bg-[#A6ABDD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender duration-200 active:transform active:scale-110"
    >
      {children}
    </button>
  )
}

export function SquarredButton({ children, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center justify-center p-2 border-none shadow-sm bg-gradient-to-r from-red-500 via-yellow-500 to-yellow-300 dark:from-yellow-300 dark:to-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lavender active:transform active:scale-110 transition duration-300"
    >
      {children}
    </button>
  )
}
