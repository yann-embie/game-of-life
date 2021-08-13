import { useEffect, useState, useRef } from "react"
import Head from "next/head"
import { StartStopButton } from "../components/buttons"
import { Navbar } from "../components/navbar"
import { ShortcutsModal, RulesModal } from "../components/modal"
import { cloneDeep } from "lodash"
import Table from "../components/table"
import { useHotkeys } from "react-hotkeys-hook"

import CustomStepSlider from "../components/slider"
import { Spinner } from "@chakra-ui/react"
import { Animations } from "../components/animations"

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
  const [matriceDimension, setMatriceDimension] = useState(30)
  const [array, setArray] = useState(() => createMatrice(matriceDimension))
  const [timeoutBetweenArrayReRender, setTimeoutBetweenArrayReRender] = useState(150)
  const [counter, setCounter] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMatriceLoading, setIsMatriceLoading] = useState(false)

  const isRunningReference = useRef(null)
  const arrayReference = useRef(null)
  const timeoutBetweenArrayReRenderReference = useRef(null)

  isRunningReference.current = isRunning
  arrayReference.current = array
  timeoutBetweenArrayReRenderReference.current = timeoutBetweenArrayReRender

  useEffect(() => {
    handleRestart()
    setTimeout(() => {
      setIsMatriceLoading(false)
    }, 500)
  }, [matriceDimension])

  useEffect(() => {
    if (isRunning) game()
  }, [isRunning])

  useHotkeys("p", () => {
    handleIsRunning()
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
          matriceDimension
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
      console.log(timeoutBetweenArrayReRenderReference.current)
    }, timeoutBetweenArrayReRenderReference.current)
  }

  const handleIsRunning = () => {
    setIsAnimating(isanimating => !isanimating)
    if (isRunningReference.current) {
      return setIsRunning(false)
    } else {
      return setIsRunning(true)
    }
  }

  const handleRestart = () => {
    if (isRunningReference.current) setIsRunning(false)
    setCounter(0)
    setArray(createMatrice(matriceDimension))
  }

  const handleRandom = () => {
    if (isRunningReference.current) setIsRunning(false)
    setCounter(0)
    setArray(createMatrice(matriceDimension, true))
  }

  return (
    <div className="min-h-screen bg-lavender dark:bg-dark-green-custom background-opacity-10 font-josephin-sans transition duration-150">
      <Head>
        <title>Game of life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAnimating && <Animations />}
      <main className="w-full h-full py-10 z-10 relative">
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
            {isMatriceLoading ? (
              <div className="flex justify-center bg-lavender py-[18.37rem] lg:py-[14.86rem] lg:w-full dark:bg-dark-green-custom dark:border-b dark:border-r dark:border-l dark:border-lavender">
                <Spinner size="xl" />
              </div>
            ) : (
              <Table
                array={array}
                setArray={setArray}
                dimension={matriceDimension}
                handleDrawingStatus={bool => setIsDrawing(bool)}
                isDrawing={isDrawing}
              />
            )}
          </div>
          <CustomStepSlider
            title="Time between render"
            min={5}
            max={505}
            step={20}
            defaultValue={timeoutBetweenArrayReRender}
            action={duration => setTimeoutBetweenArrayReRender(duration)}
          />
          <CustomStepSlider
            title="Matrice size"
            min={20}
            max={60}
            step={10}
            defaultValue={matriceDimension}
            action={duration => {
              setIsMatriceLoading(true)
              setMatriceDimension(duration)
            }}
          />
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
