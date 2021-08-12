import { cloneDeep } from "lodash"

export default function Table(props) {
  const handleMouseOver = (lineIndex, columnIndex) => {
    if (!props.array[lineIndex][columnIndex] && props.isDrawing) {
      props.array[lineIndex].splice(columnIndex, 1, true)
      props.setArray(oldArr => {
        return cloneDeep(oldArr)
      })
    }
  }

  return (
    <div
      className="grid w-full"
      style={{ aspectRatio: "1" }}
      style={{ gridTemplateColumns: `repeat(${props.dimension}, 1fr)` }}
      onMouseDown={() => props.handleDrawingStatus(true)}
      onMouseUp={() => props.handleDrawingStatus(false)}
    >
      {props.array.map((lines, lineIndex) => {
        return lines.map((square, columnIndex) => (
          <div
            className={`ring-0 border border-lavender-gray dark:border-opacity-50 ${
              square ? "bg-green-custom dark:bg-yellow-500" : "bg-lavender dark:bg-green-custom"
            }`}
            style={{ aspectRatio: "1/1" }}
            key={columnIndex}
            onClick={() => {
              props.array[lineIndex].splice(columnIndex, 1, !square)
              props.setArray(oldArr => {
                return cloneDeep(oldArr)
              })
            }}
            onMouseEnter={() => {
              handleMouseOver(lineIndex, columnIndex)
            }}
          />
        ))
      })}
    </div>
  )
}
