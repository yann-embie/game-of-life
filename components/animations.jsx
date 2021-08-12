import { SquareEmbie, TriangleEmbie, CircleEmbie, HexagonEmbie } from "../components/icons"

export function Animations() {
  // To know the lenght of an svg, use this fct

  // var path = document.getElementById("hexagon_embie_path")
  // console.log(path)
  // if (path) {
  //   var length = path.getTotalLength()
  //   console.log(length)
  // }
  return (
    <div className="absolute top-0 left-0 h-screen w-screen">
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
