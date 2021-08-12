import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import { StartStopButton } from "../components/buttons"
import { Navbar } from "../components/navbar"
import { ShortcutsModal, RulesModal } from "../components/modal"
import { cloneDeep } from "lodash"
import Table from "../components/table"
import { useHotkeys } from "react-hotkeys-hook"
import { TestIcon } from "../components/icons"

const dimension = 50

const randomBooleanTable = dimension => [...Array(dimension)].map(() => Math.random() >= 0.8)
const falseTable = dimension => Array(dimension).fill(false)

const createMatrice = (dimension, random = false) => {
  return Array(dimension)
    .fill()
    .map(() => (random ? randomBooleanTable(dimension) : falseTable(dimension)))
}

const neighboursCoordinates = [
  [-1, -1],
  [-1, -0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const getNeighboursAmount = (array, lineIndex, columnIndex, dimension) => {
  let counter = 0

  neighboursCoordinates.map(coord => {
    if (
      lineIndex > 0 &&
      lineIndex < dimension - 1 &&
      columnIndex > 0 &&
      columnIndex < dimension - 1 &&
      array[lineIndex + coord[0]][columnIndex + coord[1]]
    )
      counter++
  })
  return counter
}

const handleDarkMode = () => {
  if (localStorage.theme === undefined) {
    localStorage.theme = "dark"
  }
  localStorage.theme === "light" ? (localStorage.theme = "dark") : (localStorage.theme = "light")
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

export default function Home() {
  const [array, setArray] = useState(() => createMatrice(dimension))
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)

  const isRunningReference = useRef(null)
  const arrayReference = useRef(null)

  isRunningReference.current = isRunning
  arrayReference.current = array

  useEffect(() => {
    if (isRunning) game()
  }, [isRunning])

  useHotkeys("p", () => {
    if (isRunningReference.current) setIsRunning(false)
    else setIsRunning(true)
  })

  useHotkeys("r", () => {
    handleRandom()
  })

  useHotkeys("s", () => {
    setIsShortcutsModalOpen(isOpen => !isOpen)
  })

  useHotkeys("l", () => {
    setIsRulesModalOpen(isOpen => !isOpen)
  })

  useHotkeys("d", () => {
    handleDarkMode()
  })

  useHotkeys("a", () => {
    handleRestart()
  })

  const game = () => {
    if (!isRunningReference.current) return 1
    const newArray = cloneDeep(arrayReference.current)

    array.map((lines, indexOfLine) =>
      lines.map((square, indexOfColumn) => {
        const amountOfNeighbours = getNeighboursAmount(
          arrayReference.current,
          indexOfLine,
          indexOfColumn,
          dimension
        )
        if (amountOfNeighbours < 2 || amountOfNeighbours > 3)
          newArray[indexOfLine][indexOfColumn] = false
        else if (amountOfNeighbours === 3) newArray[indexOfLine][indexOfColumn] = true
      })
    )
    setArray(newArray)
    setCounter(counter => counter + 1)
    setTimeout(() => {
      game()
    }, 150)
  }

  const handleIsRunning = () => {
    setIsRunning(isrunning => !isrunning)
  }

  const handleRestart = () => {
    if (isRunningReference.current) setIsRunning(false)
    setCounter(0)
    setArray(createMatrice(dimension))
  }

  const handleRandom = () => {
    if (isRunningReference.current) setIsRunning(false)
    setCounter(0)
    setArray(createMatrice(dimension, true))
  }

  return (
    <div className="min-h-screen bg-lavender dark:bg-dark-green-custom background-opacity-10 font-josephin-sans transition duration-150">
      <Head>
        <title>Game of life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Animations /> */}
      <main className="w-full h-screen py-10 z-10">
        <ShortcutsModal
          isOpen={isShortcutsModalOpen}
          handleOpen={bool => setIsShortcutsModalOpen(bool)}
        />
        <RulesModal isOpen={isRulesModalOpen} handleOpen={bool => setIsRulesModalOpen(bool)} />
        <ContentHeader>Bienvenue</ContentHeader>
        <MainContainer>
          <div className="w-full flex border-2 border-dark-green-custom rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none dark:bg-green-custom bg-dark-green-custom flex-col lg:flex-row">
            <Navbar
              isRunning={isRunning}
              counter={counter}
              handleRestart={handleRestart}
              handleRandom={handleRandom}
              handleDarkMode={handleDarkMode}
              showShortcuts={() => setIsShortcutsModalOpen(isOpen => !isOpen)}
              showRules={() => setIsRulesModalOpen(isOpen => !isOpen)}
            />
            <Table
              array={array}
              setArray={setArray}
              dimension={dimension}
              handleDrawingStatus={bool => setIsDrawing(bool)}
              isDrawing={isDrawing}
            />
          </div>
          <StartStopButton isRunning={isRunning} handleIsRunning={handleIsRunning} />
        </MainContainer>
      </main>
    </div>
  )
}

function MainContainer({ children }) {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-4 w-full space-y-6 text-center">{children}</div>
  )
}

function ContentHeader({ children }) {
  return (
    <h1 className="text-center mb-8 text-6xl text-dark-green-custom dark:text-lavender text-opacity-70 font-bold transition duration-150">
      {children}
    </h1>
  )
}

function Animations() {
  return (
    <div className="absolute h-screen w-screen z-0">
      <TestIcon classes="absolute" />
      <TestIcon classes="absolute" />
      <TestIcon classes="absolute" />
    </div>
  )
}
