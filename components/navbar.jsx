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
    <div className="sm-height:w-full flex flex-col justify-between items-center sm-height:flex-row bg-transparent py-3 px-4 border-lavender">
      <div className="flex-1 sm-height:my-auto space-y-4 sm-height:space-y-0">
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
      <div className="flex items-center sm-height:block flex-1">
        <SquarredButton handleClick={handleDarkMode} dataId="danger">
          <DangerIcon />
        </SquarredButton>
      </div>
      <div className="space-y-4 sm-height:space-y-0 sm-height:space-x-4 flex flex-col sm-height:flex-row flex-1  justify-end">
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
