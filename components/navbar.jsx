import { BadgeWithColorOnActive } from "./badges"
import { CircularButton, SquarredButton } from "./buttons"
import { DangerIcon, RandomIcon, RestartIcon, ShortcutsIcon, RulesIcon } from "./icons"

export function Navbar({
  isRunning,
  counter,
  handleRestart,
  handleRandom,
  handleDarkMode,
  showShortcuts,
  showRules,
}) {
  return (
    <div className="flex lg:flex-col justify-between items-center bg-transparent py-3 px-4 border-lavender">
      <div className="flex-1 space-y-1 lg:space-y-4 space-x-1 sm:space-x-4 lg:space-x-0 flex lg:block">
        <BadgeWithColorOnActive isActive={isRunning}>{counter}</BadgeWithColorOnActive>
        <CircularButton handleClick={showShortcuts} dataId="shortcuts" tooltipContent="Shortcuts">
          <ShortcutsIcon />
        </CircularButton>
        <CircularButton
          handleClick={showRules}
          dataId="rules"
          tooltipContent="Show/hide rules ('l')"
        >
          <RulesIcon />
        </CircularButton>
      </div>
      <div className="flex items-center justify-center flex-1 mx-1 lg:my-0">
        <SquarredButton
          handleClick={handleDarkMode}
          dataId="danger"
          tooltipContent="Danger zone, carefull"
        >
          <DangerIcon />
        </SquarredButton>
      </div>
      <div className="lg:space-y-4 space-x-1 sm:space-x-4 lg:space-x-0 flex lg:flex-col flex-1 justify-end">
        <CircularButton handleClick={handleRandom} dataId="random" tooltipContent="Random ('r')">
          <RandomIcon />
        </CircularButton>
        <CircularButton handleClick={handleRestart} dataId="restart" tooltipContent="Restart ('a')">
          <RestartIcon />
        </CircularButton>
      </div>
    </div>
  )
}
