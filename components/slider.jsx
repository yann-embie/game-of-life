import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react"

export default function CustomStepSlider({ title, action, defaultValue, min, max, step }) {
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
