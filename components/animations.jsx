import { SquareEmbie, TriangleEmbie, CircleEmbie, HexagonEmbie } from "../components/icons"

// To know the lenght of an svg, use this fct

export const getLength = idOfElement => {
  var path = document.getElementById("hexagon_embie_path")
  if (path) {
    var length = path.getTotalLength()
    console.log(length)
  }
}

export function Animations() {
  return (
    <div className="absolute top-0 left-0 h-full w-screen overflow-hidden">
      <SquareEmbie id="square_2_embie" />
      <CircleEmbie id="circle_2_embie" />
      <HexagonEmbie id="hexagon_2_embie" />
      <TriangleEmbie id="triangle_2_embie" />
      <SquareEmbie id="square_embie" />
      <TriangleEmbie id="triangle_embie" />
      <CircleEmbie id="circle_embie" />
      <HexagonEmbie id="hexagon_embie" />
    </div>
  )
}
