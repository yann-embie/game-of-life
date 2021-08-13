import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"

export function Sliders({
  timeoutBetweenArrayReRender,
  handleTimeoutBetweenArrayReRender,
  matriceDimension,
  handleMatriceDimension,
}) {
  return (
    <div className="px-6">
      <CustomStepSlider
        title="Time between render"
        min={5}
        max={505}
        step={20}
        defaultValue={timeoutBetweenArrayReRender}
        action={handleTimeoutBetweenArrayReRender}
      />
      <CustomStepSlider
        title="Matrice size"
        min={20}
        max={60}
        step={10}
        defaultValue={matriceDimension}
        action={handleMatriceDimension}
      />
    </div>
  )
}

export function CustomStepSlider({ title, action, defaultValue, min, max, step }) {
  return (
    <>
      <h3 className="text-left text-dark-green-custom dark:text-lavender md:text-lg">{title}</h3>
      <Slider defaultValue={defaultValue} min={min} max={max} step={step} onChange={action}>
        <SliderTrack bg="purple.400">
          <SliderFilledTrack bg="purple.900" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </>
  )
}
