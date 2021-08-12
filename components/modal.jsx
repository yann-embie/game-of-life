import {
  ShortcutsIcon,
  XIcon,
  DangerIconLavender,
  RandomIcon,
  RestartIcon,
  PlayIcon,
  RulesIcon,
} from "./icons"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

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
      <ul className="space-y-2 text-sm text-gray-500">
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
      <ol className="space-y-2 text-sm text-gray-500 list-none">
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
    <>
      <Modal isOpen={isOpen} onClose={handleOpen}>
        <ModalOverlay />
        <ModalContent style={{ backgroundColor: "#D9DBF1" }}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton>
            <XIcon />
          </ModalCloseButton>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
