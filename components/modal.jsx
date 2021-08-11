import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import {
  ShortcutsIcon,
  XIcon,
  DangerIconLavender,
  RandomIcon,
  RestartIcon,
  PlayIcon,
  RulesIcon,
} from "./icons"

const shortcuts = [
  { icon: <ShortcutsIcon />, key: "s", action: "Open or close the shortcut popup" },
  { icon: <RulesIcon />, key: "l", action: "Open or close the rules popup" },
  { icon: <PlayIcon />, key: "p", action: "Play or pause the game" },
  {
    icon: <DangerIconLavender />,
    key: "d",
    action: "Activate or deactivate dark mode",
  },
  {
    icon: <RandomIcon />,
    key: "r",
    action: "Fill the game with random boxes (restart a new game)",
  },
  {
    icon: <RestartIcon />,
    key: "a",
    action: "Fill the game with empty boxes (restart a new game)",
  },
]

const rules = [
  {
    number: 1,
    description:
      "Any live cell with fewer than two live neighbours dies, as if by underpopulation.",
  },
  {
    number: 2,
    description: "Any live cell with two or three live neighbours lives on to the next generation.",
  },
  {
    number: 3,
    description:
      "Any live cell with more than three live neighbours dies, as if by overpopulation.",
  },
  {
    number: 4,
    description:
      "Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.",
  },
]

export function ShortcutsModal(props) {
  return (
    <ModalLayout {...props} title="Shortcuts">
      <ul className="space-y-2 text-sm text-gray-500 dark:text-lavender">
        {shortcuts.map(shortcut => (
          <li key={shortcut.key} className="flex items-center space-x-4">
            <div className="rounded-full bg-dark-green-custom bg-opacity-50 w-8 h-8 p-2 flex justify-center items-center">
              {shortcut.icon}
            </div>
            <span>"{shortcut.key}"</span>
            <span>{shortcut.action}</span>
          </li>
        ))}
      </ul>
    </ModalLayout>
  )
}

export function RulesModal(props) {
  return (
    <ModalLayout {...props} title="Rules">
      <ol className="space-y-2 text-sm text-gray-500 dark:text-lavender list-none">
        {rules.map(rule => (
          <li key={rule.number} className="flex items-center space-x-4">
            {rule.number}. {rule.description}
          </li>
        ))}
      </ol>
    </ModalLayout>
  )
}

function ModalLayout({ isOpen, handleOpen, children, title }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        auto-reopen="true"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-indigo-50 dark:bg-green-custom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0 focus:ring-offset-0 transition duration-150 active:scale-110"
                  onClick={() => handleOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left space-y-4">
                  <Dialog.Title
                    as="h3"
                    className="text-xl leading-6 font-medium text-gray-900 dark:text-lavender-gray"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
