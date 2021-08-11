import { cloneDeep } from "lodash"

export default function Table(props) {
  const handleMouseOver = (lineIndex, columnIndex, square) => {
    if (!props.array[lineIndex][columnIndex] && props.drawingStatus) {
      props.array[lineIndex].splice(columnIndex, 1, !square)
      props.setArray(oldArr => {
        return cloneDeep(oldArr)
      })
    }
  }

  return (
    <div
      className="sm-height:pl-1 sm-height:pr-0.5 sm-height:pb-1 grid w-full"
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
            style={{ aspectRatio: "1" }}
            key={columnIndex}
            onClick={() => {
              props.array[lineIndex].splice(columnIndex, 1, !square)
              props.setArray(oldArr => {
                return cloneDeep(oldArr)
              })
            }}
            onMouseMove={() => {
              handleMouseOver(lineIndex, columnIndex, square)
            }}
          />
        ))
      })}
    </div>
  )
}
